import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem } from '../utils/todoUtils';

test.describe('Tests for adding todos', () => {
	let todoPage: TodoPage;
    const randomTodo: string = getRandomTodoItem()
 
	test.beforeEach(async ({ page }) => {
		await page.goto('');
		todoPage = new TodoPage(page);
	});

	test('@smoke - should add a single todo item', async () => {
		await todoPage.addTodo(randomTodo);
		await expect(todoPage.todoItemLabelByText(randomTodo)).toBeVisible();
	});

	test('should add multiple todo items', async () => {
		for (const todoItem of TODO_ITEMS) {
			await todoPage.addTodo(todoItem);
			await expect(todoPage.todoItemLabelByText(todoItem)).toBeVisible();
		}
	});

	test('should trim whitespace from todo text', async () => {
        const toDoItemWithWhitespace: string = '    ' + randomTodo
		await todoPage.addTodo(toDoItemWithWhitespace);
		await expect(todoPage.todoItemLabelByText(randomTodo)).toBeVisible();
	});

    test('should reject todos containing only whitespace', async () => {
        await todoPage.addTodo('     ');
        await expect(todoPage.todoItemLabel()).not.toBeVisible();
    });

	test('@smoke - should not add an empty todo', async () => {
		await todoPage.addTodo('');
		await expect(todoPage.todoItemLabel()).not.toBeVisible();
	});
});
