export const HOURS_IN_A_DAY = 24;
export const WEEKS_IN_A_MONTH = 4;

export const SECOND_MS = 1_000;
export const MINUTE_MS = 60 * SECOND_MS;
export const HOUR_MS = 60 * MINUTE_MS;
export const DAY_MS = 24 * HOUR_MS;
export const WEEK_MS = 7 * DAY_MS;
export const MONTH_MS = WEEKS_IN_A_MONTH * WEEK_MS;

export const STALE_TIMES = {
  "1m": 1 * MINUTE_MS,
  "3m": 3 * MINUTE_MS,
  "5m": 5 * MINUTE_MS,
  "15m": 15 * MINUTE_MS,
  "1h": 1 * HOUR_MS,
  "2h": 2 * HOUR_MS,
  "12h": 12 * HOUR_MS,
  "1d": 1 * DAY_MS,
} as const;

export const ONE_HOUR_MS = HOUR_MS;
export const ONE_DAY_MS = DAY_MS;
export const ONE_WEEK_MS = WEEK_MS;
export const ONE_MONTH_MS = MONTH_MS;
export const TIMEOUT_IN_MILLISECONDS = 2 * MINUTE_MS;
