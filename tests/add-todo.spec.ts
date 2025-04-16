import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for adding todos', () => {
	let todoPage: TodoPage;
    let randomIndex: number = Math.floor(Math.random() * TODO_ITEMS.length);
 
	test.beforeEach(async ({ page }) => {
		await page.goto('');
		todoPage = new TodoPage(page);
	});

	test('should add a single todo item @smoke', async () => {
		await todoPage.addTodo(TODO_ITEMS[randomIndex]);
		await expect(todoPage.todoItemLabelByText(TODO_ITEMS[randomIndex])).toBeVisible();
	});

	test('should add multiple todo items', async () => {
		for (const todoItem of TODO_ITEMS) {
			await todoPage.addTodo(todoItem);
			await expect(todoPage.todoItemLabelByText(todoItem)).toBeVisible();
		}
	});

	test('should trim whitespace from entered text', async () => {
        let randomTodoItem = TODO_ITEMS[randomIndex]
        let toDoItemWithWhitespace: string = '    ' + randomTodoItem
		await todoPage.addTodo(toDoItemWithWhitespace);
		await expect(todoPage.todoItemLabelByText(randomTodoItem)).toBeVisible();
	});

    test('should not add a todo with only whitespace', async () => {
        await todoPage.addTodo('     ');
        await expect(todoPage.todoItemLabel()).not.toBeVisible();
    });

	test('should not add an empty todo @smoke', async () => {
		await todoPage.addTodo('');
		await expect(todoPage.todoItemLabel()).not.toBeVisible();
	});
});
