import { describe, expect, it } from "vitest";

import { createDefaultTripData, normalizeTripData } from "@/lib/trip-data";

describe("trip data defaults and restore", () => {
  it("gives a new account the current default values", () => {
    const data = normalizeTripData(null);

    expect(data.travelMoneyGoal).toBe(5500);
    expect(data.savedMoney).toBe(0);
    expect(data.darkMode).toBe(false);
    expect(data.checkedItems).toEqual({});
    expect(data.infoFields.checkIn).toBe("14/02/2027");
    expect(data.infoFields.transfer).toBe("A definir");
    expect(data.infoFields.notes).toEqual([""]);
  });

  it("restores saved values and fills fields missing from older saves with defaults", () => {
    const data = normalizeTripData({
      savedMoney: 1200,
      darkMode: true,
      checkedItems: { "adult-swim": true },
      infoFields: { hotelName: "Pousada Maré", notes: ["Levar protetor", "Ligar para o hotel"] },
    });

    expect(data.savedMoney).toBe(1200);
    expect(data.darkMode).toBe(true);
    expect(data.checkedItems).toEqual({ "adult-swim": true });
    expect(data.infoFields.hotelName).toBe("Pousada Maré");
    expect(data.infoFields.notes).toEqual(["Levar protetor", "Ligar para o hotel"]);
    expect(data.travelMoneyGoal).toBe(5500);
    expect(data.infoFields.destinationAirport).toBe(
      createDefaultTripData().infoFields.destinationAirport,
    );
  });

  it("ignores values of the wrong type instead of breaking the page", () => {
    const data = normalizeTripData({
      savedMoney: "muito",
      travelMoneyGoal: -10,
      infoFields: { wifi: 42, notes: [] },
    });

    expect(data.savedMoney).toBe(0);
    expect(data.travelMoneyGoal).toBe(5500);
    expect(data.infoFields.wifi).toBe("");
    expect(data.infoFields.notes).toEqual([""]);
  });
});
