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
    val === 'L' ||
    val === 'LW' ||
    /L-[0-9]+/.test(val) ||
    /[0-9]W/.test(val) ||
    /[0-9]L/.test(val)
  );
};
export const getCronByText = (cornText: string) => {
  // 保留前6位
  const cornTextArry = cornText.split(" ").filter((_, index) => index <= 6);
  let second = cornTextArry[0] || "*";
  if (!testVal(second)) {
    second = "*";
  }
  let minute = cornTextArry[1] || "*";
  if (!testVal(minute)) {
    minute = "*";
  }
  let hour = cornTextArry[2] || "*";
  if (!testVal(hour)) {
    hour = "*";
  }
  let day = cornTextArry[3] || "*";
  if (!testDayVal(day)) {
    day = "*";
  } 
  let week = cornTextArry[5] || "?";
  if (!(testVal(week) || /[0-9]#[0-9]/.test(week))) {
    week = "?";
  } 
  let month = cornTextArry[4] || "*";
  if (!testVal(month)) {
    month = "*";
  } 
  let year = cornTextArry[6] || "*";
  if (!testVal(year)) {
    year = "*";
  }
  return {
    second,
    minute,
    hour,
    day,
    week,
    month,
    year
  } 
};
