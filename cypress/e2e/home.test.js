/// <reference types="Cypress" />
describe("Home Page Checks", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("has no detectable a11y violations on load", () => {
    cy.injectAxe();
    cy.checkA11y();
  })
})
