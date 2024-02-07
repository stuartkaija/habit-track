import { format, set, getDay, getWeek, getYear, getDaysInYear, getWeekOfMonth, getMonth } from 'date-fns'

class HabitGenerator {
  generateHabitData(): HabitData[][] {
    const habitData: HabitData[][] = [];
    let currentWeek: HabitData[] = [];

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

    return habitData;
  }
}

interface HabitData {
  date: Date | null;
  habitComplete: boolean;
  dayOfWeek: number;
  weekOfMonth: number | null;
  weekOfYear: number;
  month: number | null;
}

export default HabitGenerator;