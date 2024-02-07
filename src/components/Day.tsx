import { format, isPast, isDate, formatISO } from "date-fns"; // use this to check the created at, and if date isPast compared to created at, we'll make all those days light grey or something and click disabled maybe

export default function Day({ date, completionStatus, onUpdate }: any) {

  const handleMarkComplete = async () => {
    onUpdate(date, !completionStatus);
  }

  // console.log(date)

  // const test = new Date(date);

  // console.log(test)
  // console.log(isDate(test))

  // const isoTest = formatISO(test);
  // console.log(isoTest)
  // console.log(isDate(isoTest))

  return (
    <div className="group relative w-max">
      <div
        className={`h-3 w-3 border border-black rounded-sm cursor-pointer ${completionStatus ? 'bg-green-300' : 'bg-white'}`}
        onClick={handleMarkComplete}
      >
        <span
          className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"
        >
          {format(date, 'MMM dd')}
        </span>
      </div>
    </div>
  )
}
