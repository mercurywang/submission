import PropTypes from 'prop-types'
import React from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <>
    <h2>Log in to application</h2>

    <form onSubmit={handleLogin}>
      <div>
        <TextField
          id="username"
          type="text"
          value={username}
          label="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mt-6">
        <TextField
          id="password"
          type="password"
          value={password}
          label="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button size="small" variant="contained" id="login-button" type="submit">
        login
      </Button>
    </form>
  </>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
