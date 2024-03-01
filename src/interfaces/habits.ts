export interface CompletionDatum {
  date: Date | null;
  habitComplete: boolean;
  dayOfWeek: number;
  weekOfMonth: number | null;
  weekOfYear: number;
  month: number | null;
}