import { format, set, getDay, getWeek, getYear, getDaysInYear } from 'date-fns'

class HabitGenerator {
  generateHabitData(): HabitData[] {
    const habitData: HabitData[] = [];
    const currentDate = new Date();
    const currentYear = getYear(currentDate);
    // console.log(currentYear);
    // console.log(typeof currentYear)
    const daysInYear = getDaysInYear(currentYear);
    // console.log(daysInYear);

    for (let day = 1; day <= daysInYear; day++) {
      const date = new Date(currentYear, 0, day)
      const habitDatum = {
        date,
        habitComplete: false,
        dayOfWeek: getDay(date),
        weekOfYear: getWeek(date)
      }
      habitData.push(habitDatum);
    }

    return habitData;
  }
}

interface HabitData {
  date: Date;
  habitComplete: boolean;
  dayOfWeek: number;
  weekOfYear: number;
}

export default HabitGenerator;