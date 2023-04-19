import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import blogService from '../services/blogs'
import { useMatch } from 'react-router-dom'
import CommentForm from './Comment'

const Blog = () => {
  const [blog, setBlog] = useState(null)

  const match = useMatch('/blogs/:id')

  useEffect(() => {
    const getBlogById = async () => {
      const _blog = await blogService.getById(match.params.id)
      setBlog(_blog)
    }
    getBlogById()
  }, [])

  const updateBlog = async () => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    setBlog(updatedBlog)
  }

  const addComment = async (comment) => {
    const updatedBlog = await blogService.addComment({
      ...blog,
      comments: [...(blog.comments || []), comment],
    })
    setBlog(updatedBlog)
  }

  if (!blog) {
    return <>loading....</>
  }

  return (
    <div>
      <h3 className="blogTitle">
        {blog?.title} by {blog?.author}
      </h3>
      <a href={blog?.url}>{blog?.url}</a>
      <div>
        {`likes ${blog?.likes}`}
        <IconButton color="primary" aria-label="Thumb Up" onClick={updateBlog}>
          <ThumbUpOffAltIcon />
        </IconButton>
      </div>
      <div>Uploaded by {blog?.user?.name}</div>

      <CommentForm addComment={addComment} />

      <div>
        {blog?.comments.length > 0 && 'comments below'}
        {blog?.comments?.map((comment, idx) => (
          <p key={idx}>{comment}</p>
        ))}
      </div>
    </div>
  )
}

export default Blog
