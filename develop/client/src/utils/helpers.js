import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export function checkDueDate(date) {
    const checkedDate = dayjs(date);
    const currentDate = dayjs();
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');
  
    
    if (checkedDate.isTomorrow()) {
      return "tomorrow"
    } else if (checkedDate.isBefore(currentDate, 'day')) {
      return "overdue"
    } else if (checkedDate.isToday()) {
      return "today"
    } else if (checkedDate.isAfter(startOfWeek) && checkedDate.isBefore(endOfWeek)) {
      return "this week"
    } else {
      return "rest"
    }
}
