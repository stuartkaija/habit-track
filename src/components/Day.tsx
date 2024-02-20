import { format, isToday } from "date-fns"; // use this to check the created at, and if date isPast compared to created at, we'll make all those days light grey or something and click disabled maybe

export default function Day({ date, createdToday, day, week, completionStatus, handleUpdateHabit }: any) {

  const handleMarkComplete = async () => {
    handleUpdateHabit(day, week, !completionStatus);
  }

  if (!date) {
    return (
      <div className={`h-3 w-3 rounded-sm bg-gray-300`}>
      </div>
    )
  } else return (
    <div className="group relative w-max">
      <div
        className={`h-3 w-3 border rounded-sm cursor-pointer hover:bg-green-100 ${createdToday ? 'border-orange-500 shadow-sm shadow-orange-300' : ''} ${isToday(date) ? 'border-blue-500 shadow-sm shadow-blue-300' : ''} ${completionStatus ? 'bg-green-300' : 'bg-gray-100'}`}
        onClick={handleMarkComplete}
      >
      </div>
      {/* tooltip */}
      <span
        className={`pointer-events-none z-50 absolute ${day < 2 ? 'top-2' : '-top-7'} ${week < 10 ? 'left-2' : 'right-2'} w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100`}>
          {format(date, 'EEEE MMMM do')}
      </span>
    </div>
  )
}
