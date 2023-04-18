import React, { useEffect, useState } from 'react'

import { useQuery } from 'react-query'

import userService from '../services/users'
import { Link, useMatch } from 'react-router-dom'

export const UserList = ({ type = 'list' }) => {
  const [users, setUsers] = useState([])

  const userListQuery = useQuery('user', () => userService.getAll())

  const match = useMatch('/users/:id')

  useEffect(() => {
    if (userListQuery.isSuccess) {
      const _users = [...userListQuery.data]

      setUsers(_users)
    }
  }, [userListQuery.isLoading])

  if (userListQuery.isLoading) {
    return <>is loading...</>
  }

  const user = match ? users.find((user) => user.id === match.params.id) : null

  return type === 'list' ? (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Blogs created</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={idx}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>

            <td>{user.blogs?.length || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <>
      <h3>{user?.name}</h3>
      <ul>
        {user?.blogs?.map((blog, idx) => (
          <li key={idx}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
