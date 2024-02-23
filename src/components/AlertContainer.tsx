import AlertNotification from "./AlertNotification"
import SuccessAlert from "./SuccessAlert";

export default function AlertContainer({ alerts }) {
  return (
    <div className="absolute z-50 w-96 m-auto left-0 right-0 top-2">
      {alerts.map((alert) => {
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
