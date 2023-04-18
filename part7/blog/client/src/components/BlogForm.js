import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

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
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item>
            <TextField
              size="small"
              id="title"
              type="text"
              value={blog.title}
              onChange={({ target }) =>
                handleInputChange('title', target.value)
              }
              label="Title"
            />
          </Grid>
          <Grid item>
            <TextField
              size="small"
              id="author"
              type="text"
              value={blog.author}
              onChange={({ target }) =>
                handleInputChange('author', target.value)
              }
              label="Author"
            />
          </Grid>
          <Grid item>
            <TextField
              size="small"
              id="url"
              type="text"
              value={blog.url}
              onChange={({ target }) => handleInputChange('url', target.value)}
              label="Url"
            />
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              id="create-blog"
              type="submit"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default BlogForm
