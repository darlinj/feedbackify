describe('sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('sign up apears when when logged out', () => {
    cy.get('a[cy-data="signup-action"]').click()
    cy.get('div[cy-data="page-body"]')
        .should('contain.text', 'Register with feedbackify')
  })

  it('fills in the sign up form', () => {
    cy.visit('/signup')
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('input[cy-data="name"]').type("Fred Flintstone")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('input[cy-data="confirm-password"]').type("password")
    cy.get('button[cy-data="signup-button"]').click()
    cy.get('div[cy-data="page-body"]')
        .should('contain.text', 'Please check your email and confirm your account')
  })

})
