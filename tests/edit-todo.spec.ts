import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for editing todo text', () => {
    let todoPage: TodoPage;
    let randomTodo: string = TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];
 
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
        }
    });

    test('should edit a todo and press Enter to save', async () => {
        let newTodo: string = 'New Todo';
        await todoPage.editTodo(randomTodo, newTodo);
        await expect(todoPage.todoItemLabelByText(newTodo)).toBeVisible();
    });

    test('should edit a todo and click out to cancel', async ({ page }) => {
        await todoPage.todoItemLabelByText(randomTodo).dblclick();
        await page.mouse.click(0, 0);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toBeVisible();
    });

    test('should trim whitespace on edited text', async () => {
    });

    test('should not save an empty edited text', async () => {
    });

});