import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem } from '../utils/todoUtils';

test.describe('Tests for marking todos complete/incomplete', () => {
    let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem();
 
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
			await todoPage.addTodo(todoItem);
		}
    });

    test('should mark a single todo as completed @smoke', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toHaveCSS('text-decoration', /line-through/);
    });

    test('should mark multiple todos as completed', async () => {
        for (const todoItem of TODO_ITEMS) {
			await todoPage.checkTodo(todoItem);
            await expect(todoPage.todoItemLabelByText(todoItem)).toHaveCSS('text-decoration', /line-through/);
		}
    });

    test('should uncheck a completed todo @smoke', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toHaveCSS('text-decoration', /line-through/);
        await todoPage.uncheckTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).not.toHaveCSS('text-decoration', /line-through/);
    });

    test('should update the counter when todos are completed', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toHaveCSS('text-decoration', /line-through/);
        expect(await todoPage.getTodoItemCount()).toBeLessThan(TODO_ITEMS.length);
    });

    test('should update the counter when todos are uncompleted', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toHaveCSS('text-decoration', /line-through/);
        await todoPage.uncheckTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).not.toHaveCSS('text-decoration', /line-through/);
        expect(await todoPage.getTodoItemCount()).toBe(TODO_ITEMS.length);
    });
});