describe('spec', () => {
  // it('should login', () => {
  //   cy.viewport('iphone-x');
  //   cy.visit('/');
  //   cy.get('input[type="text"]').type('foo');
  //   cy.get('input[type="password"]').type('foo123');
  //   cy.get('#submit-button').click();
  //   cy.url().should('eq', 'http://localhost:8100/tabs/home');
  // })
  // it('should not login', () => {
  //   cy.viewport('iphone-x');
  //   cy.visit('/');
  //   cy.get('input[type="text"]').type('admin');
  //   cy.get('input[type="password"]').type('123');
  //   cy.get('#submit-button').click();
  //   cy.url().should('eq', 'http://localhost:8100/login');
  // })
  it('add and delete post', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    // login
    cy.get('#username').type('foo');
    cy.get('#password').type('foo123');
    cy.get('#submit-button').click();
    cy.get('#tab-button-forum').click();

    const title = 'test post';
    const content = 'this is a test post made by cypress';
    cy.get('#post-title').type(title);
    cy.get('#post-content').type(content);
    cy.get('#submit-post').click();

    cy.contains('h5', title)
      .parents('ion-item')
      .within(() => {
        cy.get('ion-card-content')
          .contains(content);
        cy.get('ion-button[color="danger"]').click();
      });
  })
})
