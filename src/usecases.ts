import { CHAIN_ORIGIN, currencyBalance } from "./api";
import { SAMPLE_BOOK, quoteBuy } from "./slip";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const quote = quoteBuy(SAMPLE_BOOK, 15n);
if (!quote.ok) throw new Error(quote.reason);
const filled = quote;

export const USE_CASES: UseCase[] = [
  {
    title: "Alcor's market list is not this book",
    detail: "GET /api/markets is the public market list. It is not a depth snapshot at checkout, and quoteBuy does not parse it. The request is not sent.",
    request: { method: "GET", url: "https://wax.alcor.exchange/api/markets", executed: false },
    transaction: null,
  },
  {
    title: "A balance is not a fill",
    detail: `The fixture walk pays ${filled.quote.toString()} and uses ${filled.bps.toString()} bps. No swap action is built. The Alcor contract is not in this repo.`,
    request: currencyBalance(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (filled.bps !== 334n) throw new Error(String(filled.bps));
  if (USE_CASES.some((item) => item.transaction)) throw new Error("no swap");
}
