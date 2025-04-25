import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for clearing completed todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];

    test.beforeEach(async ({ page }) => {
        await page.goto('');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
        }
    });

    test('should remove only completed todos when "Clear completed" is clicked', async () => {
        await todoPage.checkTodo(randomTodo);
        await todoPage.clickClearCompletedBtn();
        await expect(todoPage.todoItemByText(randomTodo)).not.toBeVisible();
    });

});