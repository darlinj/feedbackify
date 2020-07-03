
const login = () => {
    cy.visit('/')
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('button[cy-data="login-button"]').click()
    cy.get('a[cy-data="login-action"]')
        .should('have.text', 'log out')
}

describe('Check that the homepage renders', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('The homepage has the expected title', () => {
    cy.contains('Feedbackify')
  })

  it('Logging in', () => {
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('button[cy-data="login-button"]').click()
    cy.get('a[cy-data="login-action"]')
        .should('have.text', 'log out')
    cy.get('div[cy-data="page-body"]')
        .should('contains.text', 'Welcome to Feedbackify')
  })

  it('stays logged in', () => {
    login();
    cy.visit('/')
    cy.get('div[cy-data="page-body"]')
        .should('contains.text', 'Welcome to Feedbackify')
  })

  it('loggin out', () => {
    login();
    cy.get('a[cy-data="login-action"]').click()
    cy.get('a[cy-data="login-action"]')
        .should('have.text', 'login')
    cy.get('input[cy-data="email"]').should('be.visible')

  })

})
