
Cypress.Commands.add('createColumn', (columnName) => {
  cy.contains('button', '+ Add Column').click();
  cy.get('input[placeholder="Enter column title"]').type(columnName);
  cy.contains('button', 'Create').click();
});

Cypress.Commands.add('createTask', (columnName, taskName) => {
  cy.contains('.sc-beySPh', columnName).within(() => {
    cy.contains('button', '+ Add a card').click();
    cy.get('input[placeholder="Enter a title for this card"]').type(taskName);
    cy.contains('button', 'Add card').click();
  });
});
