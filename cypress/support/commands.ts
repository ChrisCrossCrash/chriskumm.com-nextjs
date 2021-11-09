//github.com/cypress-io/cypress/issues/1152

Cypress.Commands.add('getInputByLabel', (label: string) => {
  return cy
    .contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
})

export {}
