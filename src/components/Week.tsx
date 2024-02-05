import Day from "./Day"

export default function Week({ days, onUpdate }: any) {
  console.log('WEEK')
  console.log(days)
  return (
    <div className="flex flex-col">
      {Object.entries(days).map(([date, value]) => {
        // console.log(date)
        return (
          <Day
            key={date}
            date={date}
            completionStatus={value}
            onUpdate={onUpdate}
          />
        )
      })}
    </div>
  )
}
