import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const blog = { title: '', author: '', url: '' }

  const createBlog = jest.fn()

  const component = render(<BlogForm blog={blog} createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'What a Difference a Day Made' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'María Grever, Stanley Adams' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://www.testing.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  const newBlog = createBlog.mock.calls[0][0]

  expect(newBlog.title).toBe('What a Difference a Day Made')
  expect(newBlog.author).toBe('María Grever, Stanley Adams')
  expect(newBlog.url).toBe('https://www.testing.com')
})
