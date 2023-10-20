Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (body) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBloglistUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
