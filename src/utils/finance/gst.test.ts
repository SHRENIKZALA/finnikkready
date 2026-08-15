import { describe, expect, it } from "vitest";
import { calculateGstLine, calculateInvoice, financialYearFor, invoiceNumberFor } from "./gst";

describe("FinniKK Finance GST calculations", () => {
  it("splits intrastate GST equally between CGST and SGST", () => {
    expect(calculateGstLine({ quantity: 2, unitPrice: 500, gstRate: 18, interstate: false })).toEqual({
      taxableAmount: 1000, cgstAmount: 90, sgstAmount: 90, igstAmount: 0, totalAmount: 1180,
    });
  });

  it("uses IGST for interstate supply and aggregates invoice totals", () => {
    const total = calculateInvoice([
      { quantity: 1, unitPrice: 1000, gstRate: 5, interstate: true },
      { quantity: 2, unitPrice: 250, gstRate: 18, interstate: false },
    ]);
    expect(total).toEqual({ taxableAmount: 1500, cgstAmount: 45, sgstAmount: 45, igstAmount: 50, totalAmount: 1640 });
  });

  it("builds financial-year-aware invoice numbers", () => {
    const date = new Date("2026-04-01T00:00:00.000Z");
    expect(financialYearFor(date)).toBe("2026-27");
    expect(invoiceNumberFor(12, date)).toBe("FK/2026-27/0012");
  });
});
