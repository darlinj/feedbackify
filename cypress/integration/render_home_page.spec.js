describe('Check that the homepage renders', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('The homepage has the expected title', () => {
    cy.contains('feedbackify')
  })

  it.only('Has the login from', () => {
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('button[cy-data="login-button"]').click
    cy.get('a[cy-data="login-action"]')
        .should('have.text', 'log out')
  })
})
