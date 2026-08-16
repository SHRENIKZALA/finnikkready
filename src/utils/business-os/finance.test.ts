import { describe, expect, it } from 'vitest';
import { calculateGst, calculateInvoiceTotals, canAccess } from './finance';

describe('Business OS GST calculations', () => {
  it('splits intra-state GST into CGST and SGST', () => {
    expect(calculateGst({ quantity: 2, rate: 100, gstRate: 18, mode: 'intra' })).toEqual({
      taxableAmount: 200,
      cgstAmount: 18,
      sgstAmount: 18,
      igstAmount: 0,
      totalAmount: 236,
    });
  });

  it('uses IGST for an interstate transaction', () => {
    expect(calculateGst({ quantity: 1, rate: 1000, gstRate: 18, mode: 'inter' })).toEqual({
      taxableAmount: 1000,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 180,
      totalAmount: 1180,
    });
  });

  it('aggregates invoice lines without losing paise precision', () => {
    expect(calculateInvoiceTotals([
      { quantity: 3, rate: 99.99, gstRate: 5 },
      { quantity: 1, rate: 400, gstRate: 18 },
    ], 'intra')).toEqual({
      taxableAmount: 699.97,
      cgstAmount: 43.5,
      sgstAmount: 43.5,
      igstAmount: 0,
      totalAmount: 786.97,
    });
  });
});

describe('Business OS role permissions', () => {
  it('allows billing staff to post sales but not manage the company', () => {
    expect(canAccess('billing', 'post_sales')).toBe(true);
    expect(canAccess('billing', 'manage_company')).toBe(false);
  });

  it('keeps viewers read-only', () => {
    expect(canAccess('viewer', 'view_reports')).toBe(true);
    expect(canAccess('viewer', 'post_purchases')).toBe(false);
    expect(canAccess('viewer', 'manage_inventory')).toBe(false);
  });
});
