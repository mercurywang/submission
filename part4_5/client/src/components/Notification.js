import React from 'react'

const Notification = ({ message = null, className = 'error' }) => {
  if (message === null) {
    return null
  }

  return <div className={className}>{message}</div>
}

export default Notification
