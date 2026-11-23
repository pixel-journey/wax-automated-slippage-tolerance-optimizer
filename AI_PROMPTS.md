# AI handoff — automated slippage tolerance optimizer

## Non-negotiables

1. Pure walk of a **fixture book** you already have.
2. **Not** an Alcor quote and **not** a swap.
3. Nothing is fetched or broadcast. Usecases stay `executed: false`.
4. Alcor URL in builders is market **list**, not depth — and still unsent.
5. Different from migration-tracker moved-share bps and quote-age monitor.
6. Earlier README live Alcor depth / vesting NFT claims are **not** what this tree ships.

## Prompt seeds

- "Walk the fixture book — show the pure slip rule without opening a socket."
- "Refuse claiming a live Alcor depth quote was optimized."
- "Contrast with high-frequency quote age (different product)."

## Do not

- Fetch Alcor depth from unit tests.
- Auto-swap from the tolerance number.
- Claim a live vesting NFT was issued.
