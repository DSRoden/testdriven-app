const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;

describe('Login', () => {

	it('should display the sign in form', () => {
		cy
		.visit('/login')
		.get('h1').contains('Login')
		.get('form');
	});

	// register user
	it('should allow a user to sign in', () => {
		cy.register(username, email);
		cy.logout();
		cy.login(username, email)

		// assert user is redirected to '/'
		// assert '/' is displayed properly
		cy.contains('All Users');
		cy
		.get('table')
		.find('tbody > tr').last()
		.find('td').contains(username);
		cy.get('.navbar-burger').click();
		cy.get('.navbar-menu').within(() => {
			cy
			.get('.navbar-item').contains('User Status')
			.get('.navbar-item').contains('Log Out')
			.get('.navbar-item').contains('Log In').should('not.be.visible')
			.get('.navbar-item').contains('Register').should('not.be.visible')
		});

	})
});