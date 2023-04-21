import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filters, anecdotes }) => {
    if (!filters) {
      return anecdotes
    }
    return anecdotes.filter((anecdote) => anecdote.content.includes(filters))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find((ad) => ad.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    dispatch(voteAnecdote(votedAnecdote, id))

    const content = anecdotes.find((anecdote) => anecdote.id === id).content
    dispatch(setNotification(`You voted '${content}'`, 5))
  }

  const sorted = () => {
    const copy = [...anecdotes]
    return copy.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
      {sorted().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
