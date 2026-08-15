export type GstLineInput = {
  quantity: number;
  unitPrice: number;
  gstRate: number;
  interstate: boolean;
};

export type GstAmounts = {
  taxableAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
};

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateGstLine(input: GstLineInput): GstAmounts {
  const taxableAmount = round(input.quantity * input.unitPrice);
  const taxAmount = round(taxableAmount * (input.gstRate / 100));
  return {
    taxableAmount,
    cgstAmount: input.interstate ? 0 : round(taxAmount / 2),
    sgstAmount: input.interstate ? 0 : round(taxAmount / 2),
    igstAmount: input.interstate ? taxAmount : 0,
    totalAmount: round(taxableAmount + taxAmount),
  };
}

export function calculateInvoice(lines: GstLineInput[]): GstAmounts {
  return lines.reduce<GstAmounts>((total, line) => {
    const amount = calculateGstLine(line);
    return {
      taxableAmount: round(total.taxableAmount + amount.taxableAmount),
      cgstAmount: round(total.cgstAmount + amount.cgstAmount),
      sgstAmount: round(total.sgstAmount + amount.sgstAmount),
      igstAmount: round(total.igstAmount + amount.igstAmount),
      totalAmount: round(total.totalAmount + amount.totalAmount),
    };
  }, { taxableAmount: 0, cgstAmount: 0, sgstAmount: 0, igstAmount: 0, totalAmount: 0 });
}

export function financialYearFor(date: Date) {
  const year = date.getUTCFullYear();
  const startYear = date.getUTCMonth() >= 3 ? year : year - 1;
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

export function invoiceNumberFor(sequence: number, date = new Date()) {
  return `FK/${financialYearFor(date)}/${String(sequence).padStart(4, "0")}`;
}
