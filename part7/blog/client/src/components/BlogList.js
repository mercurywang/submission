import React, { useEffect, useRef, useState, useContext } from 'react'
// import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggle from './Toggle'
import blogService from '../services/blogs'
import { useQuery } from 'react-query'
import NotificationContext from '../NotificationContext'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useContext(NotificationContext)[1]

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

  const func = {
    addBlog: async (blog) => {
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

  const blogFormRef = useRef()

  if (blogQuery.isLoading) {
    return <div>loading....</div>
  }

  return (
    <>
      <Toggle buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={func.addBlog} />
      </Toggle>
      {blogs?.map((blog) => (
        // <Blog
        //   key={blog.id}
        //   blog={blog}
        //   handleLikeClick={() => func.updateBlog(blog, index)}
        //   handleDelete={() => func.deleteBlog(blog, index)}
        // />
        <Link key={blog.id} to={`/blogs/${blog.id}`}></Link>
      ))}
    </>
  )
}

export default BlogList
