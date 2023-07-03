declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Gets an input element by its associated label.
     *
     * @param {string} label - The text content of the label.
     * @returns Cypress object for chaining.
     *
     * @example
     * cy.getInputByLabel('Email').type('test@example.com');
     */
    getInputByLabel(value: string): Chainable<Subject>
  }
}
