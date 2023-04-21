import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timer

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(_state, action) {
      if (timer) {
        clearTimeout(timer)
      }
      const content = action.payload
      return content
    },
    clearNotification() {
      return initialState
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, second) => {
  return async (dispatch) => {
    await dispatch(addNotification(notification))
    timer = setTimeout(() => dispatch(clearNotification()), second * 1000)
  }
}

export default notificationSlice.reducer
