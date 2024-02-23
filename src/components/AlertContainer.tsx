import AlertNotification from "./AlertNotification"

export default function AlertContainer({ alerts }: any) {
  return (
    <div className="absolute sticky z-50 w-96 m-auto left-0 right-0 top-2">
      {alerts.map((alert: any) => {
        console.log(alert)
        return (
          <AlertNotification
            key={alert.id}
            {...alert}
          />
        )
      })}
    </div>
  )
}
