import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';


test.describe('Add todos', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        todoPage = new TodoPage(page);
    });

    test('should add a single todo item to the list', async ({ page }) => {
        // Steps
        await todoPage.addTodo(TODO_ITEMS[1]);
        await expect(todoPage.todoItemLabelByText(TODO_ITEMS[1])).toBeVisible();
    });
    
    test('should add multiple todo items to the list', async ({ page }) => {
        // Steps
        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
            await expect(todoPage.todoItemLabelByText(todoItem)).toBeVisible();
        }
    });
    
})