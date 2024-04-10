export function getCurrentMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const EnglishName = months[currentMonth - 1];

  return {
    currentMonth: currentMonth,
    EnglishName,
  };
}

function getWeekdayName(date: Date) {
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return weekdays[date.getDay()];
}

export function getSevenDays() {
  const selectorArr = [];
  // 获取当前日期
  const today = new Date();

  // 格式化日期为两位数的字符串，如果不足两位则在前面补0
  function formatDatePart(value: any) {
    return value.toString().padStart(2, "0");
  }

  // 获取今天是周几
  const todayWeekdayName = getWeekdayName(today);

  selectorArr.push({
    week: todayWeekdayName,
    date: today.getDate(),
    completeDate: `${today.getFullYear()}-${formatDatePart(
      today.getMonth() + 1,
    )}-${formatDatePart(today.getDate())}`,
    isActive: true,
  });

  // 依次往后排上7天
  for (let i = 1; i < 7; i++) {
    // 计算下一天的日期
    const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);

    // 获取下一天是周几以及日期
    const nextDayWeekdayName = getWeekdayName(nextDay);
    const nextDayDate = nextDay.getDate();
    const nextDayMonth = nextDay.getMonth() + 1;
    const nextDayYear = nextDay.getFullYear();

    selectorArr.push({
      week: nextDayWeekdayName,
      date: nextDayDate,
      completeDate: `${nextDayYear}-${formatDatePart(
        nextDayMonth,
      )}-${formatDatePart(nextDayDate)}`,
      isActive: false,
    });
  }

  return selectorArr;
}
