import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { CalendarFormat, PERIOD } from 'constants/calendar';

dayjs.extend(isSameOrBefore).extend(isSameOrAfter);

export const getFormattedDate = (date, format = CalendarFormat) =>
  dayjs(date).format(format);

export const getTodayDate = () => dayjs().format(CalendarFormat);

export const isWeekend = (date) =>
  dayjs(date).day() === 0 || dayjs(date).day() === 6;

export const getDayOfWeek = (date) => dayjs(date).day();

export const getAdjustDateToWeekDay = (date) => {
  const day = getDayOfWeek(date);
  const index = day === 0 ? 2 : 1;
  return dayjs(date).subtract(index, 'day').format(CalendarFormat);
};

export const isSameOrBeforeDate = (startDate, endDate) =>
  dayjs(startDate).isSameOrBefore(endDate);

export const isSameOrAfterDate = (startDate, endDate) =>
  dayjs(startDate).isSameOrAfter(endDate);

export const getAddedDate = (
  startDate,
  offset = 1,
  period = PERIOD.D,
  format = CalendarFormat
) => dayjs(startDate).add(offset, period).format(format);

export const getSubtractedDate = (
  startDate,
  offset = 1,
  period = PERIOD.D,
  format = CalendarFormat
) => dayjs(startDate).subtract(offset, period).format(format);
