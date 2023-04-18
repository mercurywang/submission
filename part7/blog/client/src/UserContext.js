import React, { createContext, useReducer } from 'react'
import blogService from './services/blogs'

const userReducer = (_state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(action.user)
      )
      blogService.setToken(action.user.token)
      return action.user
    }
    case 'LOG_OUT': {
      window.localStorage.clear()
      return null
    }
    default:
      return _state
  }
}

const UserContext = createContext()

const USER = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
blogService.setToken(USER?.token)

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, USER)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
