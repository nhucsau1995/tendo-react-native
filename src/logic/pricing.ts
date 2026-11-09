// Checkout math: 5% service fee on the package price, promo applied to the package price only.
export const SERVICE_FEE_RATE = 0.05;

export type Quote = { subtotal: number; fee: number; discount: number; total: number; promo?: string };

const round2 = (n: number) => Math.round(n * 100) / 100;

export function quote(price: number, promo?: string, codes: Record<string, number> = {}): Quote {
  const rate = promo ? codes[promo.trim().toUpperCase()] ?? 0 : 0;
  const fee = round2(price * SERVICE_FEE_RATE);
  const discount = round2(price * rate);
  return { subtotal: price, fee, discount, total: round2(price + fee - discount), promo: rate ? promo!.trim().toUpperCase() : undefined };
}

export function tipTotal(total: number, tip: number) {
  return round2(total + Math.max(0, tip));
}

export function money(n: number) {
  const fixed = n.toFixed(2);
  const [whole, cents] = fixed.split('.');
  return `$${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${cents}`;
}
