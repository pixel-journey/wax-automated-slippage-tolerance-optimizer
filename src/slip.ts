/**
 * Walk a fixture ask book and return the slippage, in bps, that the walk already used.
 * Not an Alcor quote. Not a transaction.
 */

export type Level = { price: bigint; size: bigint };

export type BuyQuote =
  | { ok: false; reason: string }
  | { ok: true; quote: bigint; best: bigint; base: bigint; bps: bigint };

function ceilDiv(n: bigint, d: bigint): bigint {
  return (n + d - 1n) / d;
}

export function quoteBuy(levels: readonly Level[], wantBase: bigint): BuyQuote {
  if (wantBase <= 0n) return { ok: false, reason: "size must be positive" };
  if (levels.length === 0) return { ok: false, reason: "the book is empty" };
  const book = [...levels].sort((a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
  for (const level of book) {
    if (level.price <= 0n || level.size <= 0n) return { ok: false, reason: "price and size must be positive integers" };
  }
  let left = wantBase;
  let quote = 0n;
  for (const level of book) {
    if (left === 0n) break;
    const take = level.size < left ? level.size : left;
    quote += take * level.price;
    left -= take;
  }
  if (left !== 0n) return { ok: false, reason: "the book cannot fill that size" };
  const best = book[0]!.price;
  const bps = ceilDiv(quote * 10_000n, wantBase * best) - 10_000n;
  return { ok: true, quote, best, base: wantBase, bps };
}

export function recommend(quote: Extract<BuyQuote, { ok: true }>, bufferBps: bigint, maxBps: bigint): { ok: true; bps: bigint } | { ok: false; reason: string } {
  if (bufferBps < 0n || maxBps < 0n) return { ok: false, reason: "bps must not be negative" };
  const bps = quote.bps + bufferBps;
  if (bps > maxBps) return { ok: false, reason: `needs ${bps} bps and the cap is ${maxBps}` };
  return { ok: true, bps };
}

export const SAMPLE_BOOK: Level[] = [
  { price: 100n, size: 10n },
  { price: 110n, size: 10n },
  { price: 150n, size: 10n },
];
