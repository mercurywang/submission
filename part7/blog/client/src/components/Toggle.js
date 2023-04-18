import PropTypes from 'prop-types'
import React, { useImperativeHandle, useState } from 'react'
import Button from '@mui/material/Button'

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button size="small" variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          size="small"
          variant="contained"
          className="mt-6"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggle.displayName = 'Toggle'

export default Toggle
