import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for marking todos complete/incomplete', () => {
    let todoPage: TodoPage;
    let randomTodo: string = TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];
    let completed: string = 'completed';
 
    test.beforeEach(async ({ page }) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
			await todoPage.addTodo(todoItem);
		}
    });

    test('should mark a single todo as completed', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).toHaveClass(completed);
    });

    test('should mark multiple todos as completed', async () => {
        for (const todoItem of TODO_ITEMS) {
			await todoPage.checkTodo(todoItem);
            await expect(todoPage.todoItemByText(todoItem)).toHaveClass(completed);
		}
    });

    test('should uncheck a completed todo', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).toHaveClass(completed);
        await todoPage.uncheckTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).not.toHaveClass(completed);
    });

    test('should update the counter when todos are completed', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).toHaveClass(completed);
        expect(await todoPage.getTodoItemCount()).toBeLessThan(TODO_ITEMS.length);
    });

    test('should update the counter when todos are uncompleted', async () => {
        await todoPage.checkTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).toHaveClass(completed);
        await todoPage.uncheckTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).not.toHaveClass(completed);
        expect(await todoPage.getTodoItemCount()).toBe(TODO_ITEMS.length);
    });
});