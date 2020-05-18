describe('Check that the homepage renders', () => {
  it('The homepage has the expected title', () => {
    cy.visit('/')
    cy.contains('feedbackify')
  })
})
