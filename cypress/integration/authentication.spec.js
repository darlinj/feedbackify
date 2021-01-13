describe("Check that the homepage renders", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("The homepage has the expected title", () => {
    cy.contains("Feedbackify");
  });

  it("Logging in", () => {
    cy.get('input[cy-data="email"]').type("pinky@example.com");
    cy.get('input[cy-data="password"]').type("Passw0rd!");
    cy.get('button[cy-data="login-button"]').click();
    cy.wait(500);
    cy.get('a[cy-data="login-action"]').should("have.text", "log out");
  });

  it("stays logged in", () => {
    cy.login();
    cy.visit("/");
    cy.get('a[cy-data="login-action"]').should("have.text", "log out");
  });

  it("loggin out", () => {
    cy.login();
    cy.get('a[cy-data="login-action"]').click();
    cy.get('a[cy-data="login-action"]').should("have.text", "login");
    cy.get('input[cy-data="email"]').should("be.visible");
  });
});
