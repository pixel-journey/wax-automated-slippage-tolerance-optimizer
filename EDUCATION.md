# Education — slippage from a book you already hold

> **Rung:** `npm test` passes. The book is a fixture. Nothing is quoted from Alcor and nothing is swapped.  
> **The test is the rule.** Alcor's own code is [alcor-exchange](https://github.com/alcor-exchange). This walk is not that API.

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Walk a buy through SAMPLE_BOOK and read quote / best / bps |
| Intermediate | Explain ceil vs floor and the recommend buffer |
| Masterclass | Refuse to call this an Alcor quote or a signed swap |

---

## Beginner — one scene

`SAMPLE_BOOK` is 10 at 100, 10 at 110, and 10 at 150. `quoteBuy(SAMPLE_BOOK, 15n)` takes 10 at 100 and 5 at 110.

| Field | Result |
| --- | --- |
| quote paid | `1550n` |
| best ask | `100n` |
| bps | `334n` |

```bash
npm test
```

---

## Intermediate

The bps line is `ceil(quote * 10000 / (size * best)) - 10000`. `15500000 / 1500` is `10333.333…`, the ceil makes `10334`, and the extra over 10000 is `334`. A floor would have taught `333`. The test locks the **ceil**.

`recommend` adds a buffer. `334 + 10` is `344`, which fits under a cap of `400` and does not fit under a cap of `100`. A buy of `100` does not fit the book (only 30 is offered).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Floor the ratio | would get 333 — refused by tests |
| Oversized buy | does not fit the book |
| Cite as live Alcor quote | fixture only |

### Exercises

1. 15-unit buy on SAMPLE — quote? (**1550**.)  
2. Slippage bps? (**334**.)  
3. Is this a swap? (**No**.)

---

## Masterclass

Depth on SAMPLE is not a live book. Prefer Alcor v3 market APIs (vault `ALCOR-API.md`) for real quotes. Prefer WharfKit when a host later signs.

---

## What this course will not teach

- Live order-book polling
- A signed swap
- That ceil bps is the only correct product policy
