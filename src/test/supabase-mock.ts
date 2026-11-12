import { vi } from "vitest";

// In-memory stand-in for the project's Supabase client, so the tests can drive
// sign-in state and watch what the app reads from and writes to trip_data.
type Listener = (event: string, session: unknown) => void;

export const mockDb = {
  session: null as null | { user: { id: string; email: string } },
  row: null as null | { data: unknown },
  loadError: null as null | { message: string },
  upsertError: null as null | { message: string },
  upserts: [] as { row: { user_id: string; data: unknown }; options: unknown }[],
  loadCalls: [] as string[],
  // When set, the next load waits for this promise before answering.
  loadGate: null as null | Promise<void>,
};

const listeners = new Set<Listener>();

export function resetSupabaseMock() {
  mockDb.session = null;
  mockDb.row = null;
  mockDb.loadError = null;
  mockDb.upsertError = null;
  mockDb.upserts = [];
  mockDb.loadCalls = [];
  mockDb.loadGate = null;
  listeners.clear();
}

export function signInAs(id: string, email = `${id}@example.com`) {
  mockDb.session = { user: { id, email } };
}

export const fakeSupabase = {
  auth: {
    getSession: vi.fn(async () => ({ data: { session: mockDb.session }, error: null })),
    onAuthStateChange: vi.fn((callback: Listener) => {
      listeners.add(callback);
      return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } };
    }),
    signOut: vi.fn(async () => {
      mockDb.session = null;
      listeners.forEach((callback) => callback("SIGNED_OUT", null));
      return { error: null };
    }),
    signInWithPassword: vi.fn(async () => ({
      data: { session: null },
      error: { message: "Invalid login credentials", code: "invalid_credentials" },
    })),
    signUp: vi.fn(async () => ({ data: { session: null, user: null }, error: null })),
  },
  from: vi.fn((_table: string) => ({
    select: () => ({
      eq: (_column: string, userId: string) => ({
        maybeSingle: async () => {
          mockDb.loadCalls.push(userId);
          if (mockDb.loadGate) await mockDb.loadGate;
          if (mockDb.loadError) return { data: null, error: mockDb.loadError };
          return { data: mockDb.row, error: null };
        },
      }),
    }),
    upsert: async (row: { user_id: string; data: unknown }, options: unknown) => {
      if (mockDb.upsertError) return { error: mockDb.upsertError };
      mockDb.upserts.push({ row: JSON.parse(JSON.stringify(row)), options });
      mockDb.row = { data: row.data };
      return { error: null };
    },
  })),
};
