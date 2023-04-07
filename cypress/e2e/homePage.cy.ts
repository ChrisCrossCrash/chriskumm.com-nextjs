describe('/api/submit-inquiry', () => {
  it('returns a successful response for a valid request', function () {
    // IMPORTANT: POST requests cannot have a trailing slash, or they will
    // be redirected with the method changed from POST to GET.
    // Just don't use trailing slashes anywhere for Next JS routes.
    // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
    cy.request('POST', '/api/submit-inquiry', {
      name: 'Chris',
      email: 'ck@aol.com',
      message: 'Hello World',
      recaptchaToken: 'test',
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('returns a 405 error for non-POST requests', function () {
    cy.request({
      url: '/api/submit-inquiry',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(405)
      expect(response.body.message).to.eq('Method not allowed')
    })
  })

  describe('Name Validation', () => {
    it('returns a 400 error for an empty name', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: '', // empty name
          email: 'ck@aol.com',
          message: 'Hello World',
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })

    it('returns a 400 error for a name longer than 50 characters', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: 'a'.repeat(51),
          email: 'ck@aol.com',
          message: 'Hello World',
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })
  })

  describe('Email Validation', () => {
    it('returns a 400 error for an empty email', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: 'Chris',
          email: '', // empty email
          message: 'Hello World',
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })

    it('returns a 400 error for an invalid email', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: 'Chris',
          email: 'ck', // invalid email
          message: 'Hello World',
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })
  })

  describe('Message Validation', () => {
    it('returns a 400 error for an empty message', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: 'Chris',
          email: 'ck@aol.com',
          message: '', // empty message
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })

    it('returns a 400 error for a message longer than 5000 characters', function () {
      cy.request({
        method: 'POST',
        url: '/api/submit-inquiry',
        failOnStatusCode: false,
        body: {
          name: 'Chris',
          email: 'ck@aol.com',
          message: 'a'.repeat(5001), // message longer than 5000 characters
          recaptchaToken: 'test',
        },
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Bad request: Invalid form data')
      })
    })
  })
})

describe('Contact Form', () => {
  it('submits the form and shows successful status', function () {
    cy.intercept(
      // The request to intercept (RouteMatcher)
      {
        method: 'POST',
        url: '/api/submit-inquiry/',
      },
      // How to handle the response (RouteHandler)
      (request) => {
        expect(request.body).to.have.property('name', 'John Doe')
        expect(request.body).to.have.property('email', 'jd@aol.com')
        expect(request.body).to.have.property('message', 'Hello World')
        // Reply with StaticResponse
        request.reply({
          statusCode: 201,
          body: { status: 'success' },
        })
      }
    ).as('submitInquiry')

    cy.visit('/')
    cy.getInputByLabel('Name').type('John Doe')
    cy.getInputByLabel('Email').type('jd@aol.com')
    cy.getInputByLabel('Message').type('Hello World')
    cy.contains('Send Message').click()
    cy.contains('button', 'Thanks!')
    cy.contains('Thanks for contacting me!')
    cy.wait('@submitInquiry')
  })

  it("Shows an error when the user blurs the name input while it's empty", function () {
    cy.visit('/')

    // Scroll to the bottom of the page so that the form elements appear.
    cy.scrollTo('bottom')

    cy.getInputByLabel('Name')
      .focus()
      .blur()
      // the class names look like `TextInput_inputInvalid__64d4n`
      // because they are generated by CSS modules. That's why we must
      // use `invoke` to get the text of the class attribute, then check
      // if it contains the class we are looking for.
      .invoke('attr', 'class')
      .should('contain', 'inputInvalid')
    cy.contains('Required')
      .invoke('attr', 'class')
      .should('contain', 'invalidText')
  })

  it("Shows an error when the user blurs the message textarea while it's empty", function () {
    cy.visit('/')

    // Scroll to the bottom of the page so that the form elements appear.
    cy.scrollTo('bottom')

    cy.getInputByLabel('Message')
      .focus()
      .blur()
      .invoke('attr', 'class')
      .should('contain', 'textareaInvalid')
    cy.contains('Required')
      .invoke('attr', 'class')
      .should('contain', 'invalidText')
  })
})

export {}
