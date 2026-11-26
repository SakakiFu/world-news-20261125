# The world on 25 November 2026 in one image

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/SakakiFu/world-news-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/SakakiFu/world-news-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

A 1024×1024 newspaper front page summing up Wednesday 25 November 2026. The lead story: two oil tankers hit naval mines and burned in the Strait of Hormuz, with a third vessel reported ablaze later in the day. Three panels follow: the Houthis claim a strike on Saudi Arabia's Ras Tanura refinery, Ukrainian drones set two Russian refineries ablaze, and Pakistan's first astronaut reaches China's Tiangong station. A five-column footer carries the rest of the day's headlines — the Solomon Islands' security treaty with Australia, proposed U.S. tariffs, the freed hostages in Cartagena, deadly RSF strikes in Sudan, and the slide in Asian markets.

## Regenerate

Requires Node 22+ only — no Python, no external renderer.

```sh
node main.ts
```

`main.ts` is self-contained: it reads the `entry.png` shipped in this directory, checks it is a 1024×1024 PNG under 1 MiB, copies it to `$MAKEFUN_OUTPUT_DIR` (or this directory when unset), and verifies the copy byte-for-byte. No clock, no randomness, no network — running it twice produces byte-identical output.

## Files

- `main.ts` — self-contained entry script
- `entry.png` — the 1024×1024 front-page image
