describe('spec', () => {
  it('should login', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    // login
    cy.get('input[type="text"]').type('foo');
    cy.get('input[type="password"]').type('foo123');
    cy.get('#submit-button').click();
    cy.url().should('eq', 'http://localhost:8100/tabs/home');
  })

  it('should not login', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    // wrong password
    cy.get('input[type="text"]').type('admin');
    cy.get('input[type="password"]').type('123');
    cy.get('#submit-button').click();
    cy.url().should('eq', 'http://localhost:8100/login');
  })

  it('add and delete post', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    // login
    cy.get('#username').type('foo');
    cy.get('#password').type('foo123');
    cy.get('#submit-button').click();
    cy.get('#tab-button-forum').click();

    // add post
    const title = 'test post';
    const content = 'this is a test post made by cypress';
    cy.get('#post-title').type(title);
    cy.get('#post-content').type(content);
    cy.get('#submit-post').click();

    // check if post is added and delete it
    const post = cy.contains('h5', title);
    post.parents('ion-item')
    .within(() => {
      cy.get('ion-card-content')
        .contains(content);
      cy.get('ion-button[color="danger"]').click();
    });

    // check if post is deleted
    post.should('not.exist');
  })
  it('should update user data', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    // login
    cy.get('#username').type('foo');
    cy.get('#password').type('foo123');
    cy.get('#submit-button').click();
    cy.get('ion-tab-button[tab="my-profile"]').click();

    // generate random data
    const random = Math.floor(Math.random() * 1000);
    const username = `test${random}`;
    const name = 'test';
    const lastname = 'cypress';
    const email = `test${random}@cypress.com`;
    const address = 'test address';
    const securityQuestion = 'test question';
    const securityAnswer = 'test answer';
    const educationLevel = 'Básica incompleta';
    const birthdate = 'Sun Aug 05 2001 00:00:00 GMT-0';

    // fill form
    cy.get('#account').invoke('attr','value','').type(username); // this one is different for some reason
    cy.get('#name').clear().type(name);
    cy.get('#lastname').clear().type(lastname);
    cy.get('#email').clear().type(email);
    cy.get('#address').clear().type(address);
    cy.get('#securityQuestion').clear().type(securityQuestion);
    cy.get('#securityAnswer').clear().type(securityAnswer);
    cy.get('#educationLevel').click();
    cy.contains('button', educationLevel).click();
    cy.contains('button', 'OK').click();
    cy.get('#toggle-datepicker').click();
    cy.get('button[aria-label="Choose month and year"]').click();
    cy.get('button[aria-label="2001"]').click();
    cy.get('button[aria-label="August 2001"]').click();
    cy.get('button[aria-label="August 5, 2001"]').click();
    cy.get('#updateButton').click();

    // logout and login again
    cy.get('#logoutTabButton').click();
    cy.get('#username').invoke('attr', 'value', '').type(username);
    cy.get('#password').clear().type('foo123');
    cy.get('#submit-button').click();
    cy.get('ion-tab-button[tab="my-profile"]').click();

    // check if data is updated
    cy.get('#account').should('have.value', username);
    cy.get('#name').should('have.value', name);
    cy.get('#lastname').should('have.value', lastname);
    cy.get('#email').should('have.value', email);
    cy.get('#address').should('have.value', address);
    cy.get('#securityQuestion').should('have.value', securityQuestion);
    cy.get('#securityAnswer').should('have.value', securityAnswer);
    cy.get('#educationLevel').invoke('attr', 'ng-reflect-model').should('eq', educationLevel);
    cy.get('#birthdate').invoke('attr', 'ng-reflect-model').should('eq', birthdate);
  });

  it('should not update user data', () => {
    cy.viewport('iphone-x');
    cy.visit('/');

    // login
    cy.get('#username').type('bar');
    cy.get('#password').type('bar123');
    cy.get('#submit-button').click();
    cy.get('ion-tab-button[tab="my-profile"]').click();

    // bad email
    cy.get('#email').invoke('attr', 'value', '').type('bademail');
    cy.get('#updateButton').click();

    // check if email is not updated
    cy.get('#logoutTabButton').click();
    cy.get('#username').invoke('attr', 'value', '').type('bar');
    cy.get('#password').clear().type('bar123');
    cy.get('#submit-button').click();
    cy.get('ion-tab-button[tab="my-profile"]').click();
    cy.get('#email').should('have.value', 'bar@gmail.com');

    // empty form
    cy.get('button[aria-label="reset"]').click({ multiple: true, force: true });
    cy.get('#updateButton').click();

    // check if data is not updated
    cy.get('#logoutTabButton').click();
    cy.get('#username').invoke('attr', 'value', '').type('bar');
    cy.get('#password').clear().type('bar123');
    cy.get('#submit-button').click();
    cy.get('ion-tab-button[tab="my-profile"]').click();
    cy.get('#account').should('have.value', 'bar');
    cy.get('#email').should('have.value', 'bar@gmail.com');
    cy.get('#name').should('have.value', 'Bar');
    cy.get('#lastname').should('have.value', 'Foo');
    cy.get('#address').should('have.value', 'Rue de Rivoli, 110, París, 75001, Francia');
    cy.get('#securityQuestion').should('have.value', '¿Cuál es tu color favorito?');
    cy.get('#securityAnswer').should('have.value', 'amarillo');
  });
})
