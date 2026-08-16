export type GstMode = 'intra' | 'inter';

export type BusinessOsRole =
  | 'owner'
  | 'admin'
  | 'accountant'
  | 'billing'
  | 'purchase'
  | 'inventory'
  | 'viewer';

export type BusinessOsPermission =
  | 'manage_company'
  | 'manage_members'
  | 'manage_masters'
  | 'post_sales'
  | 'post_purchases'
  | 'post_payments'
  | 'manage_inventory'
  | 'manage_gst'
  | 'reconcile_bank'
  | 'view_reports'
  | 'view_audit';

export const ROLE_PERMISSIONS: Record<BusinessOsRole, readonly BusinessOsPermission[]> = {
  owner: [
    'manage_company',
    'manage_members',
    'manage_masters',
    'post_sales',
    'post_purchases',
    'post_payments',
    'manage_inventory',
    'manage_gst',
    'reconcile_bank',
    'view_reports',
    'view_audit',
  ],
  admin: [
    'manage_company',
    'manage_members',
    'manage_masters',
    'post_sales',
    'post_purchases',
    'post_payments',
    'manage_inventory',
    'manage_gst',
    'reconcile_bank',
    'view_reports',
    'view_audit',
  ],
  accountant: [
    'manage_masters',
    'post_sales',
    'post_purchases',
    'post_payments',
    'manage_gst',
    'reconcile_bank',
    'view_reports',
    'view_audit',
  ],
  billing: ['post_sales', 'view_reports'],
  purchase: ['post_purchases', 'view_reports'],
  inventory: ['manage_inventory', 'view_reports'],
  viewer: ['view_reports'],
};

export function canAccess(role: BusinessOsRole, permission: BusinessOsPermission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateGst(input: {
  quantity: number;
  rate: number;
  gstRate: number;
  mode: GstMode;
}) {
  const gross = roundMoney(input.quantity * input.rate);
  const taxableAmount = input.mode === 'intra'
    ? roundMoney(gross)
    : roundMoney(gross);
  const totalTax = roundMoney(taxableAmount * input.gstRate / 100);
  const cgst = input.mode === 'intra' ? roundMoney(totalTax / 2) : 0;
  const sgst = input.mode === 'intra' ? roundMoney(totalTax - cgst) : 0;
  const igst = input.mode === 'inter' ? totalTax : 0;

  return {
    taxableAmount,
    cgstAmount: cgst,
    sgstAmount: sgst,
    igstAmount: igst,
    totalAmount: roundMoney(taxableAmount + totalTax),
  };
}

export function calculateInvoiceTotals(
  lines: Array<{ quantity: number; rate: number; gstRate: number }>,
  mode: GstMode,
) {
  return lines.reduce(
    (totals, line) => {
      const next = calculateGst({ ...line, mode });
      return {
        taxableAmount: roundMoney(totals.taxableAmount + next.taxableAmount),
        cgstAmount: roundMoney(totals.cgstAmount + next.cgstAmount),
        sgstAmount: roundMoney(totals.sgstAmount + next.sgstAmount),
        igstAmount: roundMoney(totals.igstAmount + next.igstAmount),
        totalAmount: roundMoney(totals.totalAmount + next.totalAmount),
      };
    },
    { taxableAmount: 0, cgstAmount: 0, sgstAmount: 0, igstAmount: 0, totalAmount: 0 },
  );
}
