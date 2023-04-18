import React, { useContext } from 'react'
import UserContext from '../UserContext'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blog, handleLikeClick, handleDelete }) => {
  // const [hide, setHide] = useState(true)
  const user = useContext(UserContext)[0]

  // const toggleVisibility = () => setHide(!hide)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const {
    title = '',
    author = '',
    likes = 0,
    url = '',
    user: relatedUser,
  } = blog ?? {}

  return (
    <div style={blogStyle}>
      <div className="blogTitle">
        {title} {author}
        {/* <Button size="small" variant="contained" onClick={toggleVisibility}>
          {hide ? 'View' : 'Hide'}
        </Button> */}
      </div>
      <p className="blogUrl">{url}</p>
      <p className="blogLikes">
        {`likes ${likes}`}
        <IconButton
          color="primary"
          aria-label="Thumb Up"
          onClick={handleLikeClick}
        >
          <ThumbUpOffAltIcon />
        </IconButton>
      </p>
      <p>{user?.name}</p>
      {user?.userId === relatedUser?.id && (
        <Button
          variant="outlined"
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
        >
          Remove
        </Button>
      )}
    </div>
  )
}

export default Blog
