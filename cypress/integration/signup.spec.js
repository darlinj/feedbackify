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
    cy.get('input[cy-data="email"]').type(`${uuidv4()}@example.com`)
    cy.get('input[cy-data="name"]').type("Fred Flintstone")
    cy.get('input[cy-data="password"]').type("password")
    cy.get('input[cy-data="confirm-password"]').type("password")
    cy.get('button[cy-data="signup-button"]').click()
    cy.get('div[cy-data="page-body"]')
        .should('contain.text', 'Please check your email and confirm your account')
  })

})

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
