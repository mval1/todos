/// <reference types="cypress" />

describe('example to-do app', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.clearLocalStorage();
	});

	it('Загрузка приложения с заголовком', () => {
		cy.contains('todos').should('be.visible');
	});

	it('Отображение тестовых задач', () => {
		cy.get('#todo-list li').should('be.visible');

		cy.get('#todo-list li').should('have.length', 3);

		cy.get('#todo-list li').eq(0).should('have.text', 'Покрытие тестами');
		cy.get('#todo-list li').eq(1).should('have.text', 'Прекрасный код');
		cy.get('#todo-list li').eq(2).should('have.text', 'Текстовое задание');
	});

	it('Добавление новой задачи', () => {
		const todoText = 'New Todo Item';

		cy.get('input[placeholder="What needs to be done?"]').type(
			`${todoText}{enter}`
		);

		cy.get('#todo-list li').should('have.length', 4);
		cy.get('#todo-list li').first().should('contain.text', todoText);
	});

	it('Добавление новой завершенной задачи', () => {
		const todoText = 'New Todo Item';

		cy.get('#todo-footer').find('button').contains('Completed').click();

		cy.url().should('include', 'filter=completed');

		cy.get('input[placeholder="What needs to be done?"]').type(
			`${todoText}{enter}`
		);

		cy.get('#todo-list li').should('have.length', 2);

		cy.get('#todo-list li').first().should('contain.text', todoText);
	});

	it('Удаление задачи', () => {
		const todoText = 'Todo to Delete';

		cy.get('input[placeholder="What needs to be done?"]').type(
			`${todoText}{enter}`
		);

		cy.get('#todo-list li').should('have.length', 4);
		cy.get('#todo-list li').first().should('contain.text', todoText);

		cy.get('#todo-list li').first().find('button').last().click();

		cy.get('#todo-list li').should('have.length', 3);
	});

	it('Переключение статуса всех задач', () => {
		cy.get('#todo-header button').click();

		cy.get('#todo-list li').each(($el) => {
			cy.wrap($el)
				.find('button[role="checkbox"]')
				.should('have.data', 'state', 'checked');
		});

		cy.get('#todo-header button').click();

		cy.get('#todo-list li').each(($el) => {
			cy.wrap($el)
				.find('button[role="checkbox"]')
				.should('have.data', 'state', 'checked');
		});
	});

	it('Сотртировка задач', () => {
		cy.get('#todo-list li').eq(0).should('have.text', 'Покрытие тестами');
		cy.get('#todo-list li').eq(1).should('have.text', 'Прекрасный код');
		cy.get('#todo-list li').eq(2).should('have.text', 'Текстовое задание');

		cy.get('#todo-footer').find('button').eq(2).click();

		cy.get('#todo-list li').eq(0).should('have.text', 'Текстовое задание');
		cy.get('#todo-list li').eq(1).should('have.text', 'Прекрасный код');
		cy.get('#todo-list li').eq(2).should('have.text', 'Покрытие тестами');
	});

	it('Удалять все выполненные задачи', () => {
		cy.get('#todo-header button').click();

		cy.get('#todo-list li').each(($el) => {
			cy.wrap($el)
				.find('button[role="checkbox"]')
				.should('have.data', 'state', 'checked');
		});

		cy.get('#todo-footer').find('button').last().click();

		cy.get('#todo-list li').should('have.length', 0);
	});

	it('Отображаться только активные (незавершенные) задачи', () => {
		cy.get('#todo-footer').find('button').contains('Active').click();

		cy.url().should('include', 'filter=active');

		cy.get('#todo-footer')
			.find('button[aria-pressed="true"]')
			.should('have.text', 'Active');

		cy.get('#todo-list')
			.children()
			.each(($el) => {
				cy.wrap($el)
					.find('button[role="checkbox"]')
					.should('have.data', 'state', 'unchecked');
			});
	});

	it('Отображаться только выполненные задачи', () => {
		cy.get('#todo-footer').find('button').contains('Completed').click();

		cy.url().should('include', 'filter=completed');

		cy.get('#todo-footer')
			.find('button[aria-pressed="true"]')
			.should('have.text', 'Completed');

		cy.get('#todo-list')
			.children()
			.each(($el) => {
				cy.wrap($el)
					.find('button[role="checkbox"]')
					.should('have.data', 'state', 'checked');
			});
	});
});
