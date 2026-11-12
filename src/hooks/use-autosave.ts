import { useCallback, useEffect, useRef, useState } from "react";

export type SaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

type Options = { delay?: number };

// Debounced, serialized autosave. The value it is first called with counts as
// already saved (it is what was just loaded), so nothing is written until the
// user changes something. Only one save runs at a time; changes made while a
// save is in flight are written right after it, always with the newest value.
export function useAutosave<T>(
  value: T,
  save: (value: T) => Promise<void>,
  { delay = 600 }: Options = {},
) {
  const serialized = JSON.stringify(value);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const lastSavedRef = useRef(serialized);
  const latestRef = useRef({ serialized, value });
  const saveRef = useRef(save);
  const inFlightRef = useRef<Promise<boolean> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  saveRef.current = save;
  latestRef.current = { serialized, value };

  const run = useCallback((): Promise<boolean> => {
    clearTimeout(timerRef.current);
    if (inFlightRef.current) return inFlightRef.current;
    if (latestRef.current.serialized === lastSavedRef.current) return Promise.resolve(true);

    const loop = async () => {
      try {
        while (latestRef.current.serialized !== lastSavedRef.current) {
          const snapshot = latestRef.current;
          setStatus("saving");
          await saveRef.current(snapshot.value);
          lastSavedRef.current = snapshot.serialized;
        }
        setStatus("saved");
        return true;
      } catch {
        setStatus("error");
        return false;
      } finally {
        inFlightRef.current = null;
      }
    };
    const promise = loop();
    inFlightRef.current = promise;
    return promise;
  }, []);

  useEffect(() => {
    if (serialized === lastSavedRef.current) {
      clearTimeout(timerRef.current);
      setStatus((current) => (current === "pending" ? "saved" : current));
      return;
    }
    if (!inFlightRef.current) setStatus("pending");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => void run(), delay);
  }, [serialized, delay, run]);

  // Retry automatically when the connection comes back, and warn before closing
  // the tab while changes are still unsaved.
  useEffect(() => {
    const isDirty = () => latestRef.current.serialized !== lastSavedRef.current;
    const onOnline = () => {
      if (isDirty()) void run();
    };
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty()) return;
      void run();
      event.preventDefault();
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("beforeunload", onBeforeUnload);
      clearTimeout(timerRef.current);
      if (isDirty()) void run();
    };
  }, [run]);

  // flush: save now (skipping the debounce) and report whether everything is saved.
  return { status, flush: run, retry: run };
}
