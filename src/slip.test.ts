import { describe, expect, it } from "vitest";
import { SAMPLE_BOOK, quoteBuy, recommend } from "./slip";

describe("slippage walk", () => {
  it("walks two levels and ceils the bps", () => {
    const quote = quoteBuy(SAMPLE_BOOK, 15n);
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(quote.quote).toBe(1550n);
    expect(quote.best).toBe(100n);
    expect(quote.bps).toBe(334n);
    expect(recommend(quote, 10n, 400n)).toEqual({ ok: true, bps: 344n });
    expect(recommend(quote, 0n, 100n).ok).toBe(false);
  });

  it("refuses a size the book cannot fill", () => {
    const miss = quoteBuy(SAMPLE_BOOK, 100n);
    expect(miss.ok).toBe(false);
    if (miss.ok) return;
    expect(miss.reason).toMatch(/cannot fill/);
  });

  it("refuses non-positive size", () => {
    expect(quoteBuy(SAMPLE_BOOK, 0n).ok).toBe(false);
    expect(quoteBuy(SAMPLE_BOOK, -1n).ok).toBe(false);
  });

  it("refuses an empty book", () => {
    const empty = quoteBuy([], 1n);
    expect(empty.ok).toBe(false);
    if (empty.ok) return;
    expect(empty.reason).toMatch(/empty/);
  });

  it("refuses non-positive price or size on a level", () => {
    expect(quoteBuy([{ price: 0n, size: 1n }], 1n).ok).toBe(false);
    expect(quoteBuy([{ price: 100n, size: 0n }], 1n).ok).toBe(false);
  });

  it("sorts levels so best is the lowest price", () => {
    const shuffled = [
      { price: 150n, size: 10n },
      { price: 100n, size: 10n },
      { price: 110n, size: 10n },
    ];
    const quote = quoteBuy(shuffled, 15n);
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(quote.best).toBe(100n);
    expect(quote.quote).toBe(1550n);
  });

  it("recommend refuses negative buffer or cap", () => {
    const quote = quoteBuy(SAMPLE_BOOK, 15n);
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(recommend(quote, -1n, 400n).ok).toBe(false);
    expect(recommend(quote, 0n, -1n).ok).toBe(false);
  });
});
