import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { mockDb, resetSupabaseMock, signInAs } from "./supabase-mock";

vi.mock("@/integrations/supabase/client", async () => ({
  supabase: (await import("./supabase-mock")).fakeSupabase,
}));

async function renderApp(initialUrl = "/") {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialUrl] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("trip data persistence", () => {
  beforeEach(() => resetSupabaseMock());

  it("shows only the sign-in screen without a session", async () => {
    await renderApp();

    expect(await screen.findByRole("heading", { name: "Entrar na sua conta" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Sair da conta" })).toBeNull();
    expect(screen.queryByText("Cofrinho da viagem")).toBeNull();
    expect(mockDb.loadCalls).toEqual([]);
  });

  it("restores the saved data of the signed-in account", async () => {
    signInAs("user-1");
    mockDb.row = { data: { savedMoney: 1234, infoFields: { hotelName: "Pousada Maré" } } };
    await renderApp();

    fireEvent.click((await screen.findAllByRole("link", { name: /Financeiro/ }))[0]!);
    expect(await screen.findByDisplayValue("1234")).toBeInTheDocument();
    expect(mockDb.loadCalls).toEqual(["user-1"]);

    fireEvent.click(screen.getAllByRole("link", { name: /Informações/ })[0]!);
    expect(await screen.findByDisplayValue("Pousada Maré")).toBeInTheDocument();
  });

  it("does not write anything before the saved data has loaded, nor right after it", async () => {
    signInAs("user-1");
    mockDb.row = { data: { savedMoney: 900 } };
    let releaseLoad: () => void = () => {};
    mockDb.loadGate = new Promise<void>((resolve) => {
      releaseLoad = resolve;
    });
    await renderApp();

    expect(await screen.findByText("Carregando seus dados…")).toBeInTheDocument();
    await sleep(800);
    expect(mockDb.upserts).toEqual([]);

    releaseLoad();
    await screen.findByRole("button", { name: "Sair da conta" });
    await sleep(800);
    expect(mockDb.upserts).toEqual([]);
    expect(mockDb.row).toEqual({ data: { savedMoney: 900 } });
  });

  it("autosaves an edit for the signed-in user after a short pause", async () => {
    signInAs("user-1");
    await renderApp();

    fireEvent.click((await screen.findAllByRole("link", { name: /Financeiro/ }))[0]!);
    fireEvent.change(await screen.findByLabelText(/Meta de dinheiro para levar/), {
      target: { value: "6000" },
    });
    expect(mockDb.upserts).toEqual([]);

    await waitFor(() => expect(mockDb.upserts).toHaveLength(1), { timeout: 2000 });
    const [saved] = mockDb.upserts;
    expect(saved!.row.user_id).toBe("user-1");
    expect(saved!.options).toEqual({ onConflict: "user_id" });
    expect(saved!.row.data).toMatchObject({ travelMoneyGoal: 6000, savedMoney: 0 });
    expect(saved!.row.data).not.toHaveProperty("activeSection");
    expect(await screen.findByText("Salvo")).toBeInTheDocument();
  });

  it("keeps the edit on screen and shows an error when saving fails", async () => {
    signInAs("user-1");
    mockDb.upsertError = { message: "Failed to fetch" };
    await renderApp();

    fireEvent.click((await screen.findAllByRole("link", { name: /Financeiro/ }))[0]!);
    fireEvent.change(await screen.findByLabelText(/Meta de dinheiro para levar/), {
      target: { value: "7000" },
    });

    expect(
      await screen.findByText(
        /Não foi possível salvar suas últimas alterações/,
        {},
        { timeout: 2000 },
      ),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("7000")).toBeInTheDocument();
  });

  it("signs out and hides the trip data", async () => {
    signInAs("user-1");
    await renderApp();

    fireEvent.click(await screen.findByRole("button", { name: "Sair da conta" }));

    expect(await screen.findByRole("heading", { name: "Entrar na sua conta" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Sair da conta" })).toBeNull();
  });
});
