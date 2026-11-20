# Slippage from a fixture book

**Trust label:** `educational-reference`  
**Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

Walk asks you already have. Not an Alcor quote and not a swap.

The August 2026 README described live Alcor depth, a vesting NFT, or a forecast. This tree does not do those things.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/slip.ts` | The pure rules |
| `src/slip.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent. No transaction is invented |
| `src/Demo.tsx` | Offline page |

The course is [EDUCATION.md](EDUCATION.md). `npm test` runs the rules. `npm run dev` opens the page.

## Related

- [moved share](https://github.com/pixel-journey/wax-alcor-pool-migration-tracker) — a different bps floor
- [quote age](https://github.com/pixel-journey/wax-high-frequency-position-monitor)
- [alcor-exchange](https://github.com/alcor-exchange) — not this fixture book

## Queries and unsigned transactions

`src/api.ts` builds nodeos and Hyperion requests. The Alcor URL is `GET https://wax.alcor.exchange/api/markets`, the market list, not a depth or volume feed. `executed` is false. This repo did not call any host.
