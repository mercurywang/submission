import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const INIT_BLOG = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(INIT_BLOG)

  const handleInputChange = (field, value) => {
    setBlog({ ...blog, [field]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)

    setBlog(INIT_BLOG)
  }

  return (
    <>
      <h3>create new</h3>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={blog.title}
            onChange={({ target }) => handleInputChange('title', target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={blog.author}
            onChange={({ target }) => handleInputChange('author', target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            value={blog.url}
            onChange={({ target }) => handleInputChange('url', target.value)}
          />
        </div>
        <button id="create-blog" type="submit">
          Create
        </button>
      </form>
    </>
  )
}

export default BlogForm
