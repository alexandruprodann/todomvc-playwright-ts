import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem } from '../utils/todoUtils';

test.describe('Tests for adding todos', () => {
	let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem()
 
	test.beforeEach(async ({ page }) => {
		await page.goto('');
		todoPage = new TodoPage(page);
	});

	test('should add a single todo item @smoke', async () => {
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
        let toDoItemWithWhitespace: string = '    ' + randomTodo
		await todoPage.addTodo(toDoItemWithWhitespace);
		await expect(todoPage.todoItemLabelByText(randomTodo)).toBeVisible();
	});

    test('should reject todos containing only whitespace', async () => {
        await todoPage.addTodo('     ');
        await expect(todoPage.todoItemLabel()).not.toBeVisible();
    });

	test('should not add an empty todo @smoke', async () => {
		await todoPage.addTodo('');
		await expect(todoPage.todoItemLabel()).not.toBeVisible();
	});
});
