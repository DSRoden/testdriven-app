// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('login', (userType, options = {}) => {
//   // this is an example of skipping your UI and logging in programmatically

//   // setup some basic types
//   // and user properties
//   const types = {
//     admin: {
//       name: 'Jane Lane',
//       admin: true,
//     },
//     user: {
//       name: 'Jim Bob',
//       admin: false,
//     }
//   }

//   // grab the user
//   const user = types[userType]

//   // create the user first in the DB
//   cy.request({
//     url: '/seed/users', // assuming you've exposed a seeds route
//     method: 'POST',
//     body: user,
//   })
//   .its('body')
//   .then((body) => {
//     // assuming the server sends back the user details
//     // including a randomly generated password
//     //
//     // we can now login as this newly created user
//     cy.request({
//       url: '/login',
//       method: 'POST',
//       body: {
//         email: body.email,
//         password: body.password,
//       }
//     })
//   })
// })


Cypress.Commands.add('register', (username, email) => {
	cy
	.visit('/register')
	.get('input[name="username"]').type(username)
	.get('input[name="email"]').type(email)
	.get('input[name="password"]').type('test')
	.get('input[type="submit"]').click()
});

Cypress.Commands.add('login', (username, email) => {
	cy
	.get('a').contains('Log In').click()
	.get('input[name="email"]').type(email)
	.get('input[name="password"]').type('test')
	.get('input[type="submit"]').click()
	.wait(100);
});

Cypress.Commands.add('logout', () => {
	cy.get('.navbar-burger').click();
	cy.contains('Log Out').click();
});



