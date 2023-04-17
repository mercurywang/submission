describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Orange',
      username: 'orange',
      password: '123456',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('orange')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Orange logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('oran')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Orange logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'orange', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('orange')
      cy.get('#url').type('http://testing.com')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
    })

    it('Users can like a blog', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        url: 'http://testing.com',
        author: 'Orange',
      })
      cy.contains('View').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('Users can delete a blog', function () {
      cy.createBlog({
        title: 'a blog created by cypress',
        url: 'http://testing.com',
        author: 'Orange',
      })
      cy.contains('View').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.createBlog({
        title: 'A blog created by cypress',
        url: 'http://testing1.com',
        author: 'Orange',
        likes: '20',
      })
      cy.createBlog({
        title: 'This is the second',
        url: 'http://testing2.com',
        author: 'Orange',
        likes: '2',
      })
      cy.createBlog({
        title: 'This is the last exercise',
        url: 'http://testing3.com',
        author: 'Orange',
        likes: '30',
      })

      cy.get('.blogTitle')
        .eq(0)
        .should('contain', 'This is the last exercise Orange')
      cy.get('.blogTitle')
        .eq(1)
        .should('contain', 'A blog created by cypress Orange')
    })
  })
})
