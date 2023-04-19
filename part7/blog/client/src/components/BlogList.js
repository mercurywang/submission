import React, { useEffect, useRef, useState, useContext } from 'react'
import BlogForm from './BlogForm'
import Toggle from './Toggle'
import blogService from '../services/blogs'
import { useQuery } from 'react-query'
import NotificationContext from '../NotificationContext'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import UserContext from '../UserContext'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useContext(NotificationContext)[1]
  const user = useContext(UserContext)[0]

  const blogQuery = useQuery('blogs', () => blogService.getAll())

  useEffect(() => {
    if (blogQuery.isSuccess && blogQuery.data) {
      const _blogs = [...blogQuery.data]

      _blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(_blogs)
    }
  }, [blogQuery.isLoading])

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))

    dispatch({
      type: 'SHOW',
      message: `A new blog ${newBlog.title} By ${newBlog.author}`,
      className: 'note',
    })

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  const handleDelete = async (blog, index) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      await blogService.deleteById(blog.id)

      const shallowBlogs = [...blogs]
      shallowBlogs.splice(index, 1)
      setBlogs(shallowBlogs)
    }
  }

  const blogFormRef = useRef()

  if (blogQuery.isLoading || !user) {
    return <div>loading....</div>
  }

  return (
    <>
      <Toggle buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggle>
      <div className="mt-12">
        {blogs?.map((blog, index) => (
          <div key={blog.id} className="mt-6">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {user?.userId === blog.user?.id && (
              <IconButton
                color="primary"
                onClick={() => handleDelete(blog, index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogList
