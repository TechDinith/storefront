import { describe, it, expect } from "vitest";
import { formatCurrency } from "../format";

describe("formatCurrency", () => {
  it("formats USD", () => {
    expect(formatCurrency(49)).toMatch(/\$49/);
  });
});
