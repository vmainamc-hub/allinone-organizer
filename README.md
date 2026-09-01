# Precision Sentinel + Parity — Standalone

Surgical extraction of the supplied PrecisionSentiment codebase. The runnable application exposes only the two requested intelligence surfaces:

- `/app/apex` — Sentinel
- `/app/precision-parity` — Parity

`/` redirects to Sentinel. The retained Sentinel and Parity implementations and their required local dependency closure are preserved, including observation/ranking, psychology, pressure, liquidity-sweep, DBot entry-point, and parity engines. Unrelated product routes and UI were excluded.

The shell/sidebar was reduced to Sentinel + Parity only. This is an extraction, not a redesign of the retained intelligence engines.
