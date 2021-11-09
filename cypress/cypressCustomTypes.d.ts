declare namespace Cypress {
  interface Chainable<Subject = any> {
    // TODO: Add a JSDoc comment here.
    getInputByLabel(value: string): Chainable<Element>
  }
}
