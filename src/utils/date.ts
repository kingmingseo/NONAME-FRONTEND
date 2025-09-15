function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  const {year, month, day} = getDateDetails(dateString);

  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

export type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  lastDate: number;
  firstDayOfWeek: number;
};

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDayOfWeek = startDate.getDay(); // 0(일요일)-6(토요일)이 값으로 온다
  const lastDateString = String(new Date(year, month, 0).getDate());
  const lastDate = Number(lastDateString);
  return {month, year, firstDayOfWeek, startDate, lastDate};
}

function getNewMonthYear(prevData: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentDate = getDateWithSeparator(new Date());
  const inputdDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;
  return currentDate === inputdDate;
}
export {getDateWithSeparator, getMonthYearDetails, getNewMonthYear , isSameAsCurrentDate};
