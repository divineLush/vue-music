// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('sanity test', () => {
    cy.visit('/');
    cy.contains('Listen to Great Music!');
  });
});
