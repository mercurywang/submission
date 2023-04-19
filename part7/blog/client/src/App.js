import React, { useEffect, useState, useContext } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import loginService from './services/login'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import Button from '@mui/material/Button'
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom'
import Blog from './components/Blog'
import { Navigation } from './components/Navigation'
import { UserList } from './components/UserList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [user, dispatchUser] = useContext(UserContext)

  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    dispatchUser({ type: '' })
  }, [])

  useEffect(() => {}, [location])

  const func = {
    handleLogin: async (event) => {
      event.preventDefault()
      try {
        const _user = await loginService.login({
          username,
          password,
        })

        dispatchUser({ type: 'LOGIN', user: _user })
        setUsername('')
        setPassword('')
        navigate('/')
      } catch (error) {
        dispatchNotification({
          type: 'SHOW',
          message: 'Invalid credentials',
          className: 'error',
        })

        setTimeout(() => {
          dispatchNotification({ type: 'HIDE' })
        }, 5000)
        return
      }
    },

    handleLogout: () => {
      dispatchUser({ type: 'LOG_OUT' })
      navigate('/login')
    },
  }

  return (
    <>
      <h2 className="text-3xl font-bold">Blogs</h2>
      <Notification {...notification} />
      {user && (
        <p>
          <Navigation />
          {user?.name} logged in
          <Button
            size="small"
            className="ml-6"
            variant="contained"
            onClick={func.handleLogout}
          >
            logout
          </Button>
        </p>
      )}

      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="/users" element={<UserList type="list" />} />
        <Route path="/users/:id" element={<UserList type="details" />} />
        <Route
          path="/blogs"
          element={user ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <Blog /> : <Navigate replace to="/login" />}
        />
        <Route path="/*" element={<Navigate replace to="/login" />} />

        <Route
          path="/login"
          element={
            <Toggle buttonLabel="Login">
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={func.handleLogin}
              />
            </Toggle>
          }
        />
      </Routes>
    </>
  )
}

export default App
