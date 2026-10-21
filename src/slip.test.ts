import { describe, expect, it } from "vitest";
import { SAMPLE_BOOK, quoteBuy, recommend } from "./slip";

describe("slippage walk", () => {
  it("walks two levels and ceils the bps", () => {
    const quote = quoteBuy(SAMPLE_BOOK, 15n);
    expect(quote.ok).toBe(true);
    if (!quote.ok) return;
    expect(quote.quote).toBe(1550n);
    expect(quote.bps).toBe(334n);
    expect(recommend(quote, 10n, 400n)).toEqual({ ok: true, bps: 344n });
    expect(recommend(quote, 0n, 100n).ok).toBe(false);
  });

  it("refuses a size the book cannot fill", () => {
    expect(quoteBuy(SAMPLE_BOOK, 100n).ok).toBe(false);
  });
});
