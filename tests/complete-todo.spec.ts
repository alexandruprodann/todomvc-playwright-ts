import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem, setupTodos } from '../utils/todoUtils';

test.describe('Tests for marking todos complete/incomplete', () => {
    let todoPage: TodoPage;
    const randomTodo: string = getRandomTodoItem();
 
    test.beforeEach(async ({ page }) => {
        todoPage = await setupTodos(page);
    });

    test('@smoke - should mark a single todo as completed', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemLabelByText(randomTodo)).toHaveCSS('text-decoration', /line-through/);
    });

    test('should mark multiple todos as completed', async () => {
        for (const todoItem of TODO_ITEMS) {
			await todoPage.checkTodo(todoItem);
            await expect(todoPage.todoItemLabelByText(todoItem)).toHaveCSS('text-decoration', /line-through/);
		}
    });

    test('@smoke - should uncheck a completed todo', async () => {
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