import { getWeek } from "date-fns";
import { CompletionDatum } from "../interfaces/habits";

export const calculateDaysComplete = (completionDataArray: CompletionDatum[][]): number => {
  return completionDataArray.reduce((total, week) => {
    return total + week.reduce((acc, habit) => {
      return acc + (habit.habitComplete ? 1 : 0)
    }, 0);
  }, 0);
}

export const calculateWeeklyAverage = (habitStartDate: any, totalDaysComplete: number): number => {
  const weekOfYear = getWeek(Date.now());
  const startWeek = getWeek(habitStartDate);
  const totalWeeks = weekOfYear - startWeek + 1; // +1 so as to include the start and end weeks
  const weeklyAverage = totalDaysComplete/totalWeeks;

  if (weeklyAverage % 1 !== 0) {
    return Number(weeklyAverage.toFixed(2));
  } else {
    return weeklyAverage;
  }
}