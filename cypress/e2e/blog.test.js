/// <reference types="Cypress" />
describe("Blog Page Checks", () => {
  beforeEach(() => {
    cy.visit("/blogs")
  })

  it("has no detectable a11y violations on load", () => {
    cy.injectAxe();
    cy.checkA11y();
  })
})
