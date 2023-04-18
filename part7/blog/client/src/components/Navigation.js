import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  const padding = {
    padding: 5,
  }

  return (
    <>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/blogs">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
    </>
  )
}
