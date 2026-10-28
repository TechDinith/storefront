import { storeConfig } from "@/config/store";

export function formatCurrency(amount: number, currency?: string) {
  return new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency: currency || storeConfig.currency,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat(storeConfig.locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(typeof date === "string" ? new Date(date) : date);
}
