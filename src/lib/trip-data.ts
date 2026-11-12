import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

// The editable trip state saved per account. Navigation state (active section,
// checklist focus) stays out on purpose: it belongs to the current visit only.
export type InfoFields = {
  hotelName: string;
  hotelAddress: string;
  hotelPhone: string;
  checkIn: string;
  checkOut: string;
  airline: string;
  outboundFlight: string;
  outboundTime: string;
  returnFlight: string;
  returnTime: string;
  bookingCode: string;
  originAirport: string;
  destinationAirport: string;
  rentalCompany: string;
  carModel: string;
  carPickup: string;
  carPickupTime: string;
  carReturnTime: string;
  carBooking: string;
  transfer: string;
  insurance: string;
  wifi: string;
  notes: string[];
};

export type TripData = {
  darkMode: boolean;
  travelMoneyGoal: number;
  savedMoney: number;
  checkedItems: Record<string, boolean>;
  infoFields: InfoFields;
};

export function createDefaultTripData(): TripData {
  return {
    darkMode: false,
    travelMoneyGoal: 5500,
    savedMoney: 0,
    checkedItems: {},
    infoFields: {
      hotelName: "",
      hotelAddress: "",
      hotelPhone: "",
      checkIn: "14/02/2027",
      checkOut: "19/02/2027",
      airline: "",
      outboundFlight: "",
      outboundTime: "",
      returnFlight: "",
      returnTime: "",
      bookingCode: "",
      originAirport: "Aeroporto de Confins (CNF) — Belo Horizonte",
      destinationAirport: "Aeroporto do Recife (REC)",
      rentalCompany: "",
      carModel: "",
      carPickup: "Aeroporto do Recife",
      carPickupTime: "",
      carReturnTime: "",
      carBooking: "",
      transfer: "A definir",
      insurance: "",
      wifi: "",
      notes: [""],
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonNegativeNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : fallback;
}

// Merges whatever is stored with the current defaults, so rows saved by an older
// version of the app (or a partially written row) still open with every field.
export function normalizeTripData(raw: unknown): TripData {
  const defaults = createDefaultTripData();
  if (!isRecord(raw)) return defaults;

  const checkedItems: Record<string, boolean> = {};
  if (isRecord(raw["checkedItems"])) {
    for (const [id, checked] of Object.entries(raw["checkedItems"])) {
      if (typeof checked === "boolean") checkedItems[id] = checked;
    }
  }

  const infoFields = { ...defaults.infoFields };
  const savedInfo = isRecord(raw["infoFields"]) ? raw["infoFields"] : {};
  for (const key of Object.keys(infoFields) as (keyof InfoFields)[]) {
    if (key === "notes") continue;
    const value = savedInfo[key];
    if (typeof value === "string") infoFields[key] = value;
  }
  const savedNotes = savedInfo["notes"];
  if (Array.isArray(savedNotes)) {
    const notes = savedNotes.filter((note): note is string => typeof note === "string");
    infoFields.notes = notes.length > 0 ? notes : [""];
  }

  return {
    darkMode: typeof raw["darkMode"] === "boolean" ? raw["darkMode"] : defaults.darkMode,
    travelMoneyGoal: nonNegativeNumber(raw["travelMoneyGoal"], defaults.travelMoneyGoal),
    savedMoney: nonNegativeNumber(raw["savedMoney"], defaults.savedMoney),
    checkedItems,
    infoFields,
  };
}

// Returns null when the account has never saved anything yet.
export async function fetchTripData(userId: string): Promise<TripData | null> {
  const { data, error } = await supabase
    .from("trip_data")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeTripData(data.data) : null;
}

export async function saveTripData(userId: string, tripData: TripData): Promise<void> {
  const { error } = await supabase
    .from("trip_data")
    .upsert({ user_id: userId, data: tripData as unknown as Json }, { onConflict: "user_id" });
  if (error) throw error;
}
