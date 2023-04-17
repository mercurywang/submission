import React, { useEffect, useState, useContext } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationContext from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    const USER = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

    blogService.setToken(USER?.token)
    setUser(USER)
  }, [])

  const func = {
    handleLogin: async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username,
          password,
        })

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (error) {
        dispatch({
          type: 'SHOW',
          message: 'Invalid credentials',
          className: 'error',
        })

        setTimeout(() => {
          dispatch({ type: 'HIDE' })
        }, 5000)
        return
      }
    },

    handleLogout: () => {
      setUser(null)
      window.localStorage.clear()
    },
  }

  const loginForm = () => (
    <Toggle buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={func.handleLogin}
      />
    </Toggle>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification {...notification} />

      {user === null ? (
        loginForm()
      ) : (
        <>
          <p>
            {user?.name} logged in
            <button onClick={func.handleLogout}>logout</button>
          </p>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
