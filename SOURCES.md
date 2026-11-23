# Sources

| Source | Use |
| --- | --- |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v3 market / depth for a **different** product. This lab does not call it |
| [quote age](https://github.com/pixel-journey/wax-high-frequency-position-monitor) | Age rule, not slip |
| [migration tracker](https://github.com/pixel-journey/wax-alcor-pool-migration-tracker) | Moved-share bps, not slip |
| [wharfkit/skill](https://github.com/wharfkit/skill) | SessionKit if a host later signs a swap |

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

## Product facts locked by tests

- Pure walk of a **fixture book** the caller already has.
- **Not** an Alcor quote and **not** a swap.
- Usecases stay `executed: false`. No host is called from unit tests.
- Builders may mention `GET https://wax.alcor.exchange/api/markets` (market **list**, not depth) — still unsent.

## Alcor HTTP (this lab does not call it)

| Job | Preferred |
| --- | --- |
| Depth / price | `/api/v3/market/...` on `https://<chain>.alcor.exchange` |
| Stream | `wss://<chain>.alcor.exchange/api/v3/market/stream` |
| v2 pairs/tickers | Still hosted; not required for new clients |

There is no Alcor MCP. Do not invent one.

## Portability

Fixture-book arithmetic ports. Spot/AMM account names (`alcordexmain`, `swap.alcor`, XPR `alcor`) are chain-local.

## Suggested topics

`antelope` `education` `pixel-journey` `defi` `wax`
