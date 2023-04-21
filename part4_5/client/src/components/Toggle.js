import PropTypes from 'prop-types'
import React, { useImperativeHandle, useState } from 'react'

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
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggle.displayName = 'Toggle'

export default Toggle
