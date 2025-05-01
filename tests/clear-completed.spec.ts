import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { getRandomTodoItem, setupTodos } from '../utils/todoUtils';

test.describe('Tests for clearing completed todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem();

    test.beforeEach(async ({ page }) => {
        todoPage = await setupTodos(page);
    });

    test('@smoke - should remove only completed todos when "Clear completed" is clicked', async () => {
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