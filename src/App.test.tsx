/// <reference types="cypress" />

describe('App Tests', () => {
  it('Visits the homepage', () => {
    cy.visit('/');
    // Assuming your homepage has a specific element with data-testid="welcome-message"
    cy.get('[data-testid="welcome-message"]').should('exist');
  });

  it('Navigates to About page', () => {
    cy.visit('/');
    // Assuming you have a button or link that navigates to the About page
    cy.get('[data-testid="about-link"]').click();
    cy.url().should('include', '/about');
    cy.get('[data-testid="about-page-title"]').should('exist');
  });

  // Add more tests as needed
});
