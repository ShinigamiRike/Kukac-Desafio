describe('Kanban E2E Tests', () => {

  beforeEach(() => {
    cy.visit('https://kanban-dusky-five.vercel.app/');
  });

  it.only('Cria uma nova lista', () => {
    cy.get('p')
      .filter((_, el) => el.textContent.trim() === 'Adicionar outra lista')
      .should('be.visible')
      .click();

    cy.get('div.custom-input form input[type="text"]:visible')
      .last()
      .should('be.visible')
      .type('Lista de Teste');

    cy.get('div.custom-input form button[type="submit"]:visible')
      .last()
      .click();

    cy.get('.board-header-title')
      .filter((_, el) => el.textContent.trim() === 'Lista de Teste')
      .should('exist');
  });

  it.only('Adiciona uma tarefa na lista', () => {
    cy.get('[id="💻  In ProgressCreateTask"]').within(() => {
      cy.get('div.custom-input p').should('be.visible').click();
      cy.get('input[type="text"]').should('be.visible').type('Tarefa 1');
      cy.get('button').should('be.visible').click();
    });

    cy.get('[id="📝  To DoCreateTask"]').within(() => {
      cy.get('div.custom-input p').should('be.visible').click();
      cy.get('input[type="text"]').should('be.visible').type('Tarefa 2');
      cy.get('button').should('be.visible').click();
    });

    cy.get('.sc-gKXOVf .content header p')
      .filter((_, el) => el.textContent.trim() === 'Tarefa 1')
      .should('exist');
  });

it.only('Edita o nome da tarefa', () => {

  cy.get('body').then(($body) => {
    const hasTarefa1 = $body.find('.sc-gKXOVf .content header p')
      .toArray()
      .some((el) => el.textContent.trim() === 'Tarefa 1');

    if (!hasTarefa1) {
      cy.get('[id="💻  In ProgressCreateTask"]').within(() => {
        cy.get('div.custom-input p').click();
        cy.get('input[type="text"]').type('Tarefa 1');
        cy.get('button').click();
      });
    }
  });

  cy.get('.sc-gKXOVf .content header p')
    .filter((_, el) => el.textContent.trim() === 'Tarefa 1')
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
  cy.wait(500);

  cy.get('.sc-gKXOVf .content header p')
    .filter((_, el) => el.textContent.trim() === 'Tarefa 1')
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true }) ;
    cy.wait(500);

  // 1️⃣ Clica para abrir a edição
  cy.get('.sc-jSMfEi header .custom-input p')
    .contains('Tarefa 1')
    .click({ force: true });

  // 2️⃣ Seleciona o input que apareceu após o clique
  cy.get('.sc-jSMfEi header .custom-input input')
    .clear()
    .type('Tarefa Editada');
    
    cy.get('.btn')
    .click({ force: true });
});


  it('Move a tarefa entre listas', () => {
    cy.get('body').then(($body) => {
      const hasTarefaEditada = $body.find('.sc-gKXOVf .content header p')
        .toArray()
        .some(el => el.textContent.trim() === 'Tarefa Editada');

      if (!hasTarefaEditada) {
        cy.get('[id="💻  In ProgressCreateTask"]').within(() => {
          cy.get('div.custom-input p').click();
          cy.get('input[type="text"]').type('Tarefa Editada');
          cy.get('button').click();
        });
      }
    });

    cy.window().then((win) => {
      const dataTransfer = new win.DataTransfer();

      cy.get('.sc-gKXOVf .content header p')
        .filter((_, el) => el.textContent.trim() === 'Tarefa Editada')
        .first()
        .parents('.sc-gKXOVf')
        .first()
        .trigger('dragstart', { dataTransfer });

      cy.get('.sc-iBkjds')
        .filter((_, el) => {
          const title = el.querySelector('.board-header-title');
          return title && title.textContent.trim() === '📝  To Do';
        })
        .find('.board-cards')
        .first()
        .trigger('drop', { dataTransfer });
    });

    cy.get('.sc-gKXOVf .content header p')
      .filter((_, el) => el.textContent.trim() === 'Tarefa Editada')
      .should('exist');
  });

  it.only('Exclui a tarefa', () => {
    cy.get('body').then(($body) => {
      const hasTarefaEditada = $body.find('.sc-gKXOVf .content header p')
        .toArray()
        .some(el => el.textContent.trim() === 'Tarefa Editada');

      if (!hasTarefaEditada) {
        cy.get('[id="💻  In ProgressCreateTask"]').within(() => {
          cy.get('div.custom-input p').click();
          cy.get('input[type="text"]').type('Tarefa Editada');
          cy.get('button').click();
        });
      }
    });

    cy.get('.sc-gKXOVf .content header p')
      .filter((_, el) => el.textContent.trim() === 'Tarefa Editada')
      .first()
      .parents('header')
      .first()
      .find('svg.trash')
      .first()
      .click({ force: true });

    cy.get('.sc-gKXOVf .content header p')
      .filter((_, el) => el.textContent.trim() === 'Tarefa Editada')
      .should('not.exist');
  });
});
