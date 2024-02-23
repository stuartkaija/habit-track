import { createContext, useContext, useReducer, ReactNode } from "react";
import { alertReducer } from "../reducers/alertReducer";
import AlertContainer from "../components/AlertContainer";

const initialState = {
  alerts: [],
}

const AlertContext = createContext<any>(null);

const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const addAlert = (type: string, message: string) => {
    const id = Math.floor(Math.random() * 100000);
    dispatch({ type: "ADD_ALERT", payload: { id, message, type } })
  }

  const success = (message: string) => {
    addAlert("success", message);
  }

  const error = (message: string) => {
    addAlert("error", message);
  }

  const removeAlert = (id: number) => {
    dispatch({ type: "DELETE_ALERT", payload: id })
  }

  return (
    <AlertContext.Provider value={{ success, error, removeAlert }}>
      <AlertContainer alerts={state.alerts} />
      {children}
    </AlertContext.Provider>
  )
}

const useAlert = () => {
  const context = useContext(AlertContext);
  return context;
}

export { AlertContextProvider, useAlert }