import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.beforeEach(async ({ page }) => {
	await page.goto('https://todomvc.com/examples/react/dist/');
});

// const TODO_ITEMS: string[] = [
// 	'Go to market',
// 	'Make bed',
// 	'Clean dishes',
// 	'Walk the dog',
// ];


test.describe('Add todos', () => {
    
    test('Add a single todo item', async ({ page }) => {
        // Pages
        const todoPage = new TodoPage(page);
    
        // Steps
        await todoPage.addTodo(TODO_ITEMS[1]);
        await expect(page.getByText(TODO_ITEMS[1], { exact: true })).toBeVisible();
    });
    
    test('Add multiple todo items', async ({ page }) => {
        // Pages
        const todoPage = new TodoPage(page);
    
        // Steps
        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
            await expect(page.getByText(todoItem, { exact: true })).toBeVisible();
        }
    });
    
})