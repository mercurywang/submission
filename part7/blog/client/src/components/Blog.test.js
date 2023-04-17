import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'title',
    author: 'mercury',
    url: 'https://testing.com',
    user: 'mercury',
    likes: 20,
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLikeClick={mockHandler} />)
  })

  test('title and author are rendered initially, but children are not displayed', () => {
    expect(component.container.querySelector('.blogTitle')).not.toBe(null)

    expect(component.container.querySelector('.blogContent')).toHaveStyle(
      'display: none'
    )
  })

  test('after clicking the view button, check if url and likes are correctly rendered', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const likesDiv = component.container.querySelector('.blogLikes')
    const urlDiv = component.container.querySelector('.blogUrl')

    expect(likesDiv).toHaveTextContent(`likes ${blog.likes}`)
    expect(urlDiv).toHaveTextContent(blog.url)
  })

  test('clicking the like button twice calls event handler twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
