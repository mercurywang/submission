import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

const store = configureStore({ reducer: counterReducer })

const App = () => {
  const increment = (type) => {
    store.dispatch({ type })
  }

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={() => increment('GOOD')}>good</button>
      <button onClick={() => increment('OK')}>ok</button>
      <button onClick={() => increment('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
