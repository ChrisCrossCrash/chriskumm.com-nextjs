import React from 'react'
import Chat from './Chat'

describe('<Chat />', () => {
  beforeEach(() => {
    cy.mount(
      <div style={{ height: '450px' }}>
        <Chat />
      </div>,
    )

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

  it('Can submit by pressing enter', () => {
    cy.get('textarea').type('User message{enter}')
    // Assert 'p' so that we don't just query the textarea
    cy.contains('p', 'User message')
  })

  it('Can submit by clicking the button', () => {
    cy.get('textarea').type('User message')
    cy.get('input[type="submit"]').click()
    // Assert 'p' so that we don't just query the textarea
    cy.contains('p', 'User message')
  })

  it('Clears the text area after sending a message', () => {
    cy.get('textarea').type('User message{enter}')
    cy.get('textarea').should('have.value', '')
  })

  it('Renders markdown links', () => {
    cy.get('textarea').type('https://www.example.com{enter}')
    cy.contains('a', 'https://www.example.com')
  })

  it('Renders markdown tables', () => {
    cy.get('textarea').type(
      '| Header 1 | Header 2 |{shift+enter}| -------- | -------- |{shift+enter}| Cell 1 | Cell 2 |{enter}',
    )
    cy.contains('table', 'Header 1')
    cy.contains('table', 'Header 2')
    cy.contains('table', 'Cell 1')
    cy.contains('table', 'Cell 2')
  })

  it('Renders markdown code blocks', () => {
    cy.get('textarea').type(
      '```{shift+enter}const foo = "bar"{shift+enter}```{enter}',
    )
    cy.contains('pre', 'const foo = "bar"')
  })

  it.only('Auto-scrolls to the bottom of the chat when a new message appears', () => {
    // Write several messages to the chat to make it scrollable
    cy.get('textarea').type('First User message{enter}')
    cy.get('textarea').type('User message{enter}')
    cy.get('textarea').type('User message{enter}')
    cy.get('textarea').type('Last user message{enter}')

    // The first user message should not be visible
    cy.contains('First User message').should('not.be.visible')

    // The last user message should be visible
    cy.contains('Last user message').should('be.visible')
  })
})
