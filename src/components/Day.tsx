import { format, isToday } from "date-fns";

export default function Day({ date, createdToday, isWithinTimeframe, day, weekOfYear, completionStatus, handleUpdateHabit }: any) {

  const handleMarkComplete = async () => {
    handleUpdateHabit(day, weekOfYear, !completionStatus);
  }

  if (!date || !isWithinTimeframe) {
    return (
      <div className={`h-3 w-3 rounded-sm bg-slate-200 border ${createdToday ? 'border-amber-400' : ''}`}>
      </div>
    )
  }

  return (
    <div className="group relative w-max">
      <div
        className={`h-3 w-3 border rounded-sm cursor-pointer hover:bg-green-100 ${isToday(date) ? 'border-blue-500 shadow-sm shadow-blue-400' : createdToday ? 'border-amber-500 shadow-sm shadow-amber-400' : 'shadow-sm shadow-indigo-100'} ${isToday(date) ? '' : ''} ${completionStatus ? 'bg-green-300' : 'bg-slate-50'}`}
        onClick={handleMarkComplete}
      >
      </div>
      {/* tooltip */}
      <span
        className={`pointer-events-none z-40 absolute ${day < 2 ? 'top-2' : '-top-7'} ${weekOfYear < 15 ? 'left-2' : 'right-2'} w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity delay-200 group-hover:opacity-100`}
      >
        {format(date, 'EEEE MMMM do')}
      </span>
    </div>
  )
}
