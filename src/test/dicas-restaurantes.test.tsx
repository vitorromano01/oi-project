import { QueryClient } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// The Dicas area is state-driven, so the tests drive it through a memory router:
// clicking the Restaurantes card must land on the restaurants page in one click,
// and the browser back button must land back on the Dicas categories.
async function renderApp(initialUrl: string) {
  const history = createMemoryHistory({ initialEntries: [initialUrl] });
  const router = createRouter({
    routeTree,
    history,
    context: { queryClient: new QueryClient() },
  });
  await router.load();

  render(<RouterProvider router={router} />);

  return history;
}

function firstLink(name: RegExp) {
  const [link] = screen.getAllByRole("link", { name });
  if (!link) throw new Error(`no link found matching ${name}`);
  return link;
}

function openDicasCategories() {
  fireEvent.click(firstLink(/Dicas/));
}

describe("Dicas → Restaurantes navigation", () => {
  it("makes the Restaurantes card a direct link to the restaurants page", async () => {
    await renderApp("/");
    openDicasCategories();

    const card = screen.getByRole("link", { name: /Restaurantes/ });

    expect(card.getAttribute("href")).toContain("aba=restaurantes");
    // The other Dicas categories stay non-clickable, as before.
    expect(screen.queryByRole("link", { name: /Cafés e lojinhas/ })).toBeNull();
  });

  it("opens the restaurants page on the first click, without an intermediate screen", async () => {
    await renderApp("/");
    openDicasCategories();

    fireEvent.click(screen.getByRole("link", { name: /Restaurantes/ }));

    await waitFor(() => expect(screen.getByText("Voltar para Dicas")).toBeInTheDocument());
    expect(screen.getByText("15 lugares para conhecer")).toBeInTheDocument();
    expect(screen.queryByText("Cafés e lojinhas")).toBeNull();
    const backLink = screen.getByRole("link", { name: /Voltar para Dicas/ });
    console.log("back link href:", JSON.stringify(backLink.getAttribute("href")));
    expect(backLink.getAttribute("href")).not.toBe("");
  });

  it("returns to the Dicas categories with the browser back button", async () => {
    const history = await renderApp("/");
    openDicasCategories();
    fireEvent.click(screen.getByRole("link", { name: /Restaurantes/ }));
    await waitFor(() => expect(screen.getByText("Voltar para Dicas")).toBeInTheDocument());

    history.go(-1);

    await waitFor(() => expect(screen.getByText("Cafés e lojinhas")).toBeInTheDocument());
    expect(screen.queryByText("Voltar para Dicas")).toBeNull();
  });

  it("returns to the Dicas categories with the in-app back button", async () => {
    await renderApp("/?aba=restaurantes");

    fireEvent.click(screen.getByRole("link", { name: /Voltar para Dicas/ }));

    await waitFor(() => expect(screen.getByText("Cafés e lojinhas")).toBeInTheDocument());
    expect(screen.queryByText("Voltar para Dicas")).toBeNull();
  });

  it("shows the categories again when Dicas is reopened from another section", async () => {
    await renderApp("/?aba=restaurantes");

    fireEvent.click(firstLink(/Financeiro/));
    await waitFor(() => expect(screen.getByText("Cofrinho da viagem")).toBeInTheDocument());

    openDicasCategories();

    await waitFor(() => expect(screen.getByText("Cafés e lojinhas")).toBeInTheDocument());
    expect(screen.queryByText("Voltar para Dicas")).toBeNull();
  });
});
