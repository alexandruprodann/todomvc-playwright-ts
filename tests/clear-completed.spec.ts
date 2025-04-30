import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem } from '../utils/todoUtils';

test.describe('Tests for clearing completed todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem();

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

    test('should show the "Clear completed" button only when there are completed todos', async () => {
        await expect(todoPage.clearCompletedBtn()).not.toBeVisible();
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.clearCompletedBtn()).toBeVisible();
    })

    test('should hide the "Clear completed" button after clearing', async () => {
        await todoPage.checkTodo(randomTodo);
        await todoPage.clickClearCompletedBtn();
        await expect(todoPage.clearCompletedBtn()).not.toBeVisible();
    });

});