import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const fetchData = async () => {
    const blogs = await blogService.getAll()

    blogs.sort((a, b) => {
      return b.likes - a.likes
    })

    setBlogs(blogs)
  }

  useEffect(() => {
    const USER = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

    blogService.setToken(USER?.token)
    setUser(USER)
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

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
        setMessage({ message: 'Invalid credentials', className: 'error' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    },

    handleLogout: () => {
      setUser(null)
      window.localStorage.clear()
    },

    addBlog: async (blog) => {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setMessage({
        message: `A new blog ${newBlog.title} By ${newBlog.author}`,
        className: 'note',
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },

    updateBlog: async (modifyBlog, index) => {
      const updatedBlog = await blogService.update({
        ...modifyBlog,
        likes: modifyBlog.likes + 1,
      })
      const shallowBlogs = [...blogs]
      shallowBlogs[index].likes = updatedBlog.likes
      setBlogs(shallowBlogs)
    },

    deleteBlog: async (blog, index) => {
      const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

      if (result) {
        await blogService.deleteById(blog.id)

        const shallowBlogs = [...blogs]
        shallowBlogs.splice(index, 1)
        setBlogs(shallowBlogs)
      }
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

  const blogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <Notification {...message} />

      {user === null ? (
        loginForm()
      ) : (
        <>
          <p>
            {user?.name} logged in
            <button onClick={func.handleLogout}>logout</button>
          </p>
          <Toggle buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={func.addBlog} />
          </Toggle>
          {blogs.map((blog, index) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeClick={() => func.updateBlog(blog, index)}
              userId={user.id}
              handleDelete={() => func.deleteBlog(blog, index)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
