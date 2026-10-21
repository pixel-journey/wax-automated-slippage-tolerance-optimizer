"use client";

import { SAMPLE_BOOK, quoteBuy, recommend } from "./slip";

export function Demo() {
  const quote = quoteBuy(SAMPLE_BOOK, 15n);
  const pick = quote.ok ? recommend(quote, 10n, 500n) : null;
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Slippage from a book you already have</h1>
      <p className="lede">
        Buying 15 units walks the cheapest two fixture levels. The bps is that walk, plus a buffer. Alcor was not asked, and nothing is signed.
      </p>
      <table>
        <caption>Fixture asks</caption>
        <thead>
          <tr>
            <th>Price</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_BOOK.map((level) => (
            <tr key={String(level.price)}>
              <td>{level.price.toString()}</td>
              <td>{level.size.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {quote.ok && pick && pick.ok ? (
        <p>
          Quote {quote.quote.toString()} against best {quote.best.toString()}. Walk used {quote.bps.toString()} bps. With a 10 bps buffer the suggestion is {pick.bps.toString()} bps.
        </p>
      ) : (
        <p>The sample book did not quote.</p>
      )}
    </main>
  );
}
