import React from 'react'
import Chat from './Chat'

describe('<Chat />', () => {
  beforeEach(() => {
    cy.mount(<Chat />)

    // Mock the OpenAI API call
    cy.intercept('POST', '/api/chat-api', {
      statusCode: 200,
      body: {
        result: 'Hello from the bot!',
      },
    }).as('apiCheck')
  })

  it('renders the chat interface', () => {
    cy.get('textarea').should('exist')
    cy.get('input[type="submit"]').should('exist')
  })

  it('sends a user message', () => {
    cy.get('textarea').type('User message{enter}')
    // Get the `.message` element with the user's "User message" text.
    cy.contains('User message')
  })

  it('receives an assistant message', () => {
    cy.get('textarea').type('Hello!{enter}')
    cy.wait('@apiCheck').then(() => {
      cy.contains('Hello from the bot!')
    })
  })
})
