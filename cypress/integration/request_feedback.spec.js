const login = () => {
    cy.visit('/')
    cy.get('input[cy-data="email"]').type("fred@bedrock.com")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('button[cy-data="login-button"]').click()
    cy.get('a[cy-data="login-action"]')
        .should('have.text', 'log out')
}

describe('request feedback', () => {
  beforeEach(() => {
    login()
    cy.visit('/')
  })

  it('adds questions to the list', () => {
    cy.get('input[cy-data="feedback-question"]').type("Please give me some feedback?")
    cy.get('button[cy-data="add-question"]').click()
    cy.wait(500);
    cy.get('input[cy-data="feedback-question"]').type("Anything else to add?")
    cy.get('button[cy-data="add-question"]').click()
    cy.get('div[cy-data="question-list"]')
        .should('contain.text', 'Please give me some feedback?')
    cy.get('div[cy-data="question-list"]')
        .should('contain.text', 'Anything else to add?')
  })

  it('removes questions from the list', () => {
    cy.get('input[cy-data="feedback-question"]').type("Please give me some feedback?")
    cy.get('button[cy-data="add-question"]').click()
    cy.get('input[cy-data="feedback-question"]').type("Anything else to add?")
    cy.get('button[cy-data="add-question"]').click()
    cy.get('button[cy-data="delete-question"]')[0].click()
    cy.get('div[cy-data="question-list"]')
        .should('not.contain.text', 'Please give me some  feedback??')
    cy.get('div[cy-data="recipient-list"]')
        .should('contain.text', 'Anything else to add?')
  })
})

