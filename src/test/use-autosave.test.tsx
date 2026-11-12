import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAutosave } from "@/hooks/use-autosave";

describe("useAutosave", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not save the freshly loaded value", async () => {
    const save = vi.fn(async () => {});
    renderHook(({ value }) => useAutosave(value, save, { delay: 600 }), {
      initialProps: { value: { savedMoney: 300 } },
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(save).not.toHaveBeenCalled();
  });

  it("waits 600 ms after the last change and saves once with the newest value", async () => {
    const save = vi.fn(async (_value: { savedMoney: number }) => {});
    const { rerender, result } = renderHook(
      ({ value }) => useAutosave(value, save, { delay: 600 }),
      { initialProps: { value: { savedMoney: 0 } } },
    );

    rerender({ value: { savedMoney: 10 } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    rerender({ value: { savedMoney: 20 } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(save).not.toHaveBeenCalled();
    expect(result.current.status).toBe("pending");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });

    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenLastCalledWith({ savedMoney: 20 });
    expect(result.current.status).toBe("saved");
  });

  it("never runs two saves at once and finishes with the latest change", async () => {
    let finishFirst: () => void = () => {};
    let running = 0;
    let maxRunning = 0;
    const save = vi.fn((_value: { savedMoney: number }) => {
      running += 1;
      maxRunning = Math.max(maxRunning, running);
      const done = () => {
        running -= 1;
      };
      if (save.mock.calls.length === 1)
        return new Promise<void>((resolve) => {
          finishFirst = () => {
            done();
            resolve();
          };
        });
      done();
      return Promise.resolve();
    });
    const { rerender, result } = renderHook(
      ({ value }) => useAutosave(value, save, { delay: 600 }),
      { initialProps: { value: { savedMoney: 0 } } },
    );

    rerender({ value: { savedMoney: 1 } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(result.current.status).toBe("saving");
    rerender({ value: { savedMoney: 2 } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(save).toHaveBeenCalledTimes(1);

    await act(async () => {
      finishFirst();
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(maxRunning).toBe(1);
    expect(save).toHaveBeenCalledTimes(2);
    expect(save).toHaveBeenLastCalledWith({ savedMoney: 2 });
    expect(result.current.status).toBe("saved");
  });

  it("reports an error, keeps the change, and saves it on retry", async () => {
    const save = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue(undefined);
    const { rerender, result } = renderHook(
      ({ value }) => useAutosave(value, save, { delay: 600 }),
      { initialProps: { value: { savedMoney: 0 } } },
    );

    rerender({ value: { savedMoney: 50 } });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    expect(result.current.status).toBe("error");

    await act(async () => {
      await result.current.retry();
    });

    expect(save).toHaveBeenCalledTimes(2);
    expect(save).toHaveBeenLastCalledWith({ savedMoney: 50 });
    expect(result.current.status).toBe("saved");
  });
});
