/// <reference types="Cypress" />
describe("Thanks Page Checks", () => {
  beforeEach(() => {
    cy.visit("/thanks")
  })

  it("has no detectable a11y violations on load", () => {
    cy.injectAxe();
    cy.checkA11y();
  })
})
