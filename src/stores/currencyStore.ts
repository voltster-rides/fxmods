import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  label: string;
  /** Rate relative to USD (Shopify prices are USD). */
  rate: number;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", symbol: "$",  flag: "🇺🇸", label: "USD", rate: 1 },
  EUR: { code: "EUR", symbol: "€",  flag: "🇪🇺", label: "EUR", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£",  flag: "🇬🇧", label: "GBP", rate: 0.79 },
  CAD: { code: "CAD", symbol: "CA$", flag: "🇨🇦", label: "CAD", rate: 1.36 },
  AUD: { code: "AUD", symbol: "A$", flag: "🇦🇺", label: "AUD", rate: 1.52 },
};

interface CurrencyState {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      code: "USD",
      setCode: (code) => set({ code }),
    }),
    { name: "fx-currency" }
  )
);

export function useCurrency() {
  const code = useCurrencyStore((s) => s.code);
  return CURRENCIES[code];
}

/** Convert a USD-denominated numeric amount into the active currency's display string. */
export function useFormatPrice() {
  const c = useCurrency();
  return (usdAmount: number) => {
    const converted = usdAmount * c.rate;
    return `${c.symbol}${converted.toFixed(2)}`;
  };
}