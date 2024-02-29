import { getDay, getWeek, getYear, getDaysInYear, getWeekOfMonth, getMonth } from 'date-fns'
import { CompletionDatum } from '../interfaces/habits';

class HabitGenerator {
  generateHabitData(): CompletionDatum[][] {
    const habitData: CompletionDatum[][] = [];
    let currentWeek: CompletionDatum[] = [];

    const currentDate = new Date();
    const currentYear = getYear(currentDate);
    const daysInYear = getDaysInYear(currentDate);

    for (let day = 1; day <= daysInYear; day++) {
      const date = new Date(currentYear, 0, day)
      const habitDatum = {
        date,
        habitComplete: false,
        dayOfWeek: getDay(date),
        weekOfMonth: getWeekOfMonth(date),
        weekOfYear: getWeek(date, { weekStartsOn: 0 }),
        month: getMonth(date)
      }
      currentWeek.push(habitDatum);

      if (habitDatum.dayOfWeek === 6 || day === daysInYear) {
        habitData.push(currentWeek);
        currentWeek = [];
      }
    }

    // the following code modifies the first and last weeks to ensure that they have a length of 7
    // this results in a square matrix which simplifies styling the grid i.e. every week can be mapped and styled horizontally, inside each week we can map and style vertically
    const firstWeekLength = habitData[0].length;
    if (firstWeekLength < 7) {
      const missingDays = 7 - firstWeekLength;
      for (let i = 0; i < missingDays; i++) {
        habitData[0].unshift({ date: null, habitComplete: false, dayOfWeek: i, weekOfMonth: null, weekOfYear: 1, month: null })
      }
    }

    const lastWeekLength = habitData[habitData.length - 1].length;
    if (lastWeekLength < 7) {
      const missingDays = 7 - lastWeekLength;
      for (let i = 0; i < missingDays; i++) {
        habitData[habitData.length - 1].push({ date: null, habitComplete: false, dayOfWeek: i + lastWeekLength, weekOfMonth: null, weekOfYear: habitData.length, month: null })
      }
    }

    // the following resolves issue where some of the last days of the year can fall into the first week of the following, which is problematic for styling calendar grid
    const lastWeekOfYear = habitData[habitData.length - 1];
    for (let i = 0; i < 7; i++) {
      lastWeekOfYear[i].weekOfYear = 53;
    }

    return habitData;
  }
}

export default HabitGenerator;