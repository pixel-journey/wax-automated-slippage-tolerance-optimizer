# Security

## Scope

Pure TypeScript on caller-supplied fixture books. Unit tests do not open sockets, wallets, or Alcor depth endpoints.

## Non-claims

- Slip numbers are **not** authorization to swap.
- Builders with `executed: false` must not be treated as submitted transactions.
- Do not paste private keys into demos or prompts.

## Host checklist (if a product later signs)

1. Re-quote live depth (prefer Alcor **v3** market APIs) outside this package.
2. Confirm chain id and token precision before any transfer.
3. Prefer WharfKit SessionKit; require explicit user confirm.
4. Never auto-broadcast from educational numbers alone.
