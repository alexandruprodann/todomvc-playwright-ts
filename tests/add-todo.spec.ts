import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for adding todos', () => {
	let todoPage: TodoPage;
    let randomIndex: number = Math.floor(Math.random() * TODO_ITEMS.length);
 
	test.beforeEach(async ({ page }) => {
		await page.goto('https://todomvc.com/examples/react/dist/');
		todoPage = new TodoPage(page);
	});

	test('should add a single todo item', async ({ page }) => {
		await todoPage.addTodo(TODO_ITEMS[randomIndex]);
		await expect(todoPage.todoItemLabelByText(TODO_ITEMS[randomIndex])).toBeVisible();
	});

	test('should add multiple todo items', async ({ page }) => {
		for (const todoItem of TODO_ITEMS) {
			await todoPage.addTodo(todoItem);
			await expect(todoPage.todoItemLabelByText(todoItem)).toBeVisible();
		}
	});

	test('should trim whitespace from entered text', async ({ page }) => {
        let randomTodoItem = TODO_ITEMS[randomIndex]
        let toDoItemWithWhitespace: string = '    ' + randomTodoItem
		await todoPage.addTodo(toDoItemWithWhitespace);
		await expect(todoPage.todoItemLabelByText(randomTodoItem)).toBeVisible();
	});

    test('should not add a todo with only whitespace', async ({ page }) => {
        await todoPage.addTodo('     ');
        await expect(todoPage.todoItemLabel()).not.toBeVisible();
    });

	test('should not add an empty todo', async ({ page }) => {
		await todoPage.addTodo('');
		await expect(todoPage.todoItemLabel()).not.toBeVisible();
	});
});
