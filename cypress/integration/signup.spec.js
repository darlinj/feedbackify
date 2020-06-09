describe('sign up functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('sign up apears when when logged out', () => {
    cy.get('a[cy-data="signup-action"]').click()
    cy.get('div[cy-data="page-body"]')
        .should('have.text', 'Sign up to Feedbackify')
  })

  it('fills in the sign up form', () => {
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('button[cy-data="signup-button"]').click()
    cy.get('div[cy-data="page-body"]')
        .should('have.text', 'Please check your email for a confirmation link')
  })

})
