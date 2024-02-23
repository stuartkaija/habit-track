export const alertReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ALERT":
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    case "DELETE_ALERT":
      const updatedAlerts = state.toast.filter((alert: any) => alert.id !== action.payload)
      return {
        ...state,
        alerts: updatedAlerts
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}