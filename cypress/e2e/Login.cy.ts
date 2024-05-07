describe("Signin", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display data validation errors", () => {
    cy.getInputElement("email").type("baker@gmail");
    cy.getInputElement("email").should("have.value", "baker@gmail");
    cy.getInputElement("password").type("123456");
    cy.getInputElement("password").should("have.value", "123456");
    cy.getDataCy("submit").click();
    cy.getDataCy("email-error").should(
      "contain.text",
      "email must be a valid email"
    );
  });

  it("should display errors for wrong credentials", () => {
    cy.getInputElement("email").type("baker@gmail.com");
    cy.getInputElement("email").should("have.value", "baker@gmail.com");
    cy.getInputElement("password").type("123456");
    cy.getInputElement("password").should("have.value", "123456");
    cy.getDataCy("submit").click();
    cy.getDataCy("email-error").should(
      "contain.text",
      "Invalid email or password"
    );
  });

  it("should login a user successfully", () => {
    cy.getInputElement("email").type("baker@gmail.com");
    cy.getInputElement("email").should("have.value", "baker@gmail.com");
    cy.getInputElement("password").type("1234@56mP");
    cy.getInputElement("password").should("have.value", "1234@56mP");
    cy.getDataCy("submit").click();
    cy.get('[data-cy="page-title"]', { timeout: 60000 })
      .should("exist")
      .url()
      .should("include", "/home");
  });
});
