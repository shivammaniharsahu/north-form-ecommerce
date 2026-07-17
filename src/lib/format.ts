import { storeConfig } from "@/config/store";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency: storeConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
