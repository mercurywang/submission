import React, { createContext, useReducer } from 'react'

const notificationReducer = (_state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.message, className: action.className }
    case 'HIDE':
      return { message: null }
    default:
      return _state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
