/// <reference types="Cypress" />
describe("Contact Page Checks", () => {
  beforeEach(() => {
    cy.visit("/contact")
  })

  it("has no detectable a11y violations on load", () => {
    cy.injectAxe();
    cy.checkA11y();
  })
})
