declare namespace Cypress {
  interface Chainable {
    getInputByLabel(value: string): Chainable<Element>
  }
}
