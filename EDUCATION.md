# Education — slippage from a book you already hold

> **Rung:** `npm test` passes. The book is a fixture. Nothing is quoted from Alcor and nothing is swapped.  
> **The test is the rule.** Alcor's own code is [alcor-exchange](https://github.com/alcor-exchange). This walk is not that API.

## Predict, then run

`SAMPLE_BOOK` is 10 at 100, 10 at 110, and 10 at 150. `quoteBuy(SAMPLE_BOOK, 15n)` takes 10 at 100 and 5 at 110.

| Field | Result |
| --- | --- |
| quote paid | `1550n` |
| best ask | `100n` |
| bps | `334n` |

The bps line is `ceil(quote * 10000 / (size * best)) - 10000`. `15500000 / 1500` is `10333.333…`, the ceil makes `10334`, and the extra over 10000 is `334`. A floor would have taught `333`. The test locks the ceil.

`recommend` adds a buffer. `334 + 10` is `344`, which fits under a cap of `400` and does not fit under a cap of `100`. A buy of `100` does not fit the book (only 30 is offered).

The HTTP examples include an Atomic Packs `unboxassets` row. That request is unsent, and it is not this walk.
