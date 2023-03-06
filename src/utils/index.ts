export const getCronEveryText = ({
  cronEvery,
  incrementStart,
  incrementIncrement,
  rangeStart,
  rangeEnd,
  specificSpecific,
}: any) => {
  if (cronEvery === "*") {
    return "*";
  }
  if (cronEvery === "1") {
    return `${incrementStart}/${incrementIncrement}`;
  }
  if (cronEvery === "2") {
    return `${rangeStart}-${rangeEnd}`;
  }
  if (cronEvery === "3") {
    return specificSpecific?.join(",");
  }
  return "*";
};

const testVal = (val: string) => {
  return (
    /[0-9]+-[0-9]+/.test(val) ||
    /[0-9]+\/[0-9]+/.test(val) ||
    /[0-9][,0-9]*/.test(val)
  );
};
const testDayVal = (val: string) => {
  return (
    /[0-9]+-[0-9]+/.test(val) ||
    /[0-9]+\/[0-9]+/.test(val) ||
    /[0-9][,0-9]*/.test(val) ||
    val === "L" ||
    val === "LW" ||
    /L-[0-9]+/.test(val) ||
    /[0-9]W/.test(val) ||
    /[0-9]L/.test(val)
  );
};
export const getCronByText = (cronText: string) => {
  // 保留前6位
  const cronTextArry = cronText.split(" ").filter((_, index) => index <= 6);
  let second = cronTextArry[0] || "*";
  // if (!testVal(second)) {
  //   second = "*";
  // }
  let minute = cronTextArry[1] || "*";
  // if (!testVal(minute)) {
  //   minute = "*";
  // }
  let hour = cronTextArry[2] || "*";
  // if (!testVal(hour)) {
  //   hour = "*";
  // }
  let day = cronTextArry[3] || "*";
  // if (!testDayVal(day)) {
  //   day = "*";
  // }
  let week = cronTextArry[5] || "?";
  // if (!(testVal(week) || /[0-9]#[0-9]/.test(week))) {
  //   week = "?";
  // }
  let month = cronTextArry[4] || "*";
  // if (!testVal(month)) {
  //   month = "*";
  // }
  let year = cronTextArry[6] || "*";
  // if (!testVal(year)) {
  //   year = "*";
  // }
  return {
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
  };
};

export const NumberCatch = (num: string, catchVal?: number) => {
  try {
    return Number(num);
  } catch (error) {
    return catchVal || 0;
  }
};
