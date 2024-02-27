export default function HabitStats({
  daysComplete,
  weeklyAverage
}: {
  daysComplete: number
  weeklyAverage: number
}) {
  return (
    <dl className="flex flex-col justify-center rounded-md border border-slate-100 shadow-sm divide-y divide-slate-100 text-sm">
      <div className="grid grid-cols-2 gap-6 py-3">
        <dt className="font-medium text-slate-900">Days Complete</dt>
        <dd className="text-slate-700">{daysComplete}</dd>
      </div>

      <div className="grid grid-cols-2 gap-6 py-3 content-between">
        <dt className="font-medium text-slate-900">Weekly Average</dt>
        <dd className="text-slate-700">{weeklyAverage}</dd>
      </div>

      {/* <div className="grid grid-cols-2 gap-6 py-3 content-between">
          <dt className="font-medium text-slate-900">Most Frequent Day</dt>
          <dd className="text-slate-700">$1,000,000+</dd>
        </div> */}
    </dl>
  )
}
