import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteById(state, action) {
    //   const id = action.payload
    //   const anecdoteToVote = state.find((ad) => ad.id === id)

    //   const votedAnecdote = {
    //     ...anecdoteToVote,
    //     votes: anecdoteToVote.votes + 1
    //   }

    //   return state.map((anecdote) =>
    //     anecdote.id !== id ? anecdote : votedAnecdote
    //   )
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote, id) => {
  return async (dispatch) => {
    const updatedAnecdotes = await anecdoteService.voteAnecdote(anecdote, id)
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer
