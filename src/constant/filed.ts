import { SelectOptionData } from "@arco-design/web-vue";

export const cronContextSymbol = Symbol("croncontext");

const WeekCn = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const WeekEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const /** 12 months */
  JAN = "JAN",
  FEB = "FEB",
  MAR = "MAR",
  APR = "APR",
  MAY = "MAY",
  JUN = "JUN", // 1 - 6
  JUL = "JUL",
  AUG = "AUG",
  SEP = "AUG",
  OCT = "OCT",
  NOV = "NOV",
  DEC = "DEC", // 7 - 12
  MONTHS = [JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC],
  /** 7 days of week */
  SUN = "SUN",
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
  SAT = "SAT",
  DAYS_OF_WEEK = [SUN, MON, TUE, WED, THU, FRI, SAT],
  /** symbols */
  EVERY = "*",
  PERIOD = "/",
  RANGE = "-",
  FIXED = ",",
  UNFIXED = "?",
  LAST = "L",
  WORK_DAY = "W",
  WEEK_DAY = "#",
  CALENDAR = "C",
  BASE_SYMBOL = EVERY + " " + PERIOD + " " + RANGE + " " + FIXED,
  DAY_OF_MONTH_SYMBOL =
    BASE_SYMBOL + " " + LAST + " " + WORK_DAY + " " + CALENDAR,
  DAY_OF_WEEK_SYMBOL =
    BASE_SYMBOL + " " + UNFIXED + " " + LAST + " " + WEEK_DAY + " " + CALENDAR,
  EMPTY = "",
  LAST_WORK_DAY = "LW",
  // current year like 2019
  CUR_YEAR = new Date().getFullYear(),
  //
  UPPER_LIMIT_YEAR = 2099,
  // default cron expression
  DEFAULT_CRON_EXPRESSION = "0 0 12 * * ?",
  OPTIONS_SELECT = Array.from({ length: 60 }, (_, index) => ({
    label: `${index}`,
    value: `${index}`,
  })) as unknown as SelectOptionData[],
  OPTIONS_HOUR_SELECT = Array.from({ length: 24 }, (_, index) => ({
    label: `${index}`,
    value: index,
  })) as unknown as SelectOptionData[],
  OPTIONS_WEEK_SELECT = Array.from({ length: 7 }, (_, index) => ({
    label: `${WeekCn[index]}`,
    value: index + 1,
  })) as unknown as SelectOptionData[],
  OPTIONS_WEEK_EN_SELECT = Array.from({ length: 7 }, (_, index) => ({
    label: `${WeekCn[index]}`,
    value: `${WeekEn[index]}`,
  })) as unknown as SelectOptionData[],
  OPTIONS_DAY_SELECT = Array.from({ length: 31 }, (_, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  })) as unknown as SelectOptionData[],
  OPTIONS_MONTH_SELECT = Array.from({ length: 12 }, (_, index) => ({
    label: `${index + 1}`,
    value: index + 1,
  })) as unknown as SelectOptionData[],
  OPTIONS_YEAR_SELECT = Array.from({ length: 79 }, (_, index) => ({
    label: `${index + 2021}`,
    value: index + 2021,
  })) as unknown as SelectOptionData[];
