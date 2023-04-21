export const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const increment = (state, type) => {
  const shallowCopy = { ...state }
  shallowCopy[type] += 1
  return shallowCopy
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return increment(state, 'good')
    case 'OK':
      return increment(state, 'ok')
    case 'BAD':
      return increment(state, 'bad')
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

export default counterReducer
