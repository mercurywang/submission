import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Textarea from '@mui/material/TextareaAutosize'

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('')

  const handleInputChange = ({ target }) => {
    setComment(target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    addComment(comment)
    setComment('')
  }

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={addBlog}>
        <Textarea
          maxRows={8}
          placeholder="Comments here"
          value={comment}
          style={{ width: 600, height: 100 }}
          onChange={handleInputChange}
        />
        <div>
          <Button
            size="small"
            variant="contained"
            id="create-comment"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

export default CommentForm
