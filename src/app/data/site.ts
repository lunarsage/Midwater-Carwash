/** Midwater Carwash — Aerorand, Middelburg, Mpumalanga (ZA) */

export const SITE = {
  businessName: "Midwater Carwash",
  area: "Aerorand",
  city: "Middelburg",
  province: "Mpumalanga",
  country: "South Africa",
  get shortLocation() {
    return `${this.area}, ${this.city}`;
  },
  get fullLocation() {
    return `${this.area}, ${this.city}, ${this.province}, ${this.country}`;
  },
} as const;

/** South African Rand — amounts in whole rands */
export function formatZar(amount: number): string {
  return `R\u00A0${amount.toLocaleString("en-ZA")}`;
}

/** Service prices (from R 120) */
export const SERVICE_PRICES = {
  express: 120,
  premium: 220,
  deluxe: 380,
} as const;

export function servicePriceById(serviceId: number | null | undefined): number {
  if (serviceId === 1) return SERVICE_PRICES.express;
  if (serviceId === 3) return SERVICE_PRICES.deluxe;
  return SERVICE_PRICES.premium;
}
