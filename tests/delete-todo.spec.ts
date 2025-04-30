import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem } from '../utils/todoUtils';

test.describe('Tests for deleting todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem();
 
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
        }
    });

    test('should delete a single todo item', async () => {
        await todoPage.deleteTodo(randomTodo);
        await expect(todoPage.todoItemByText(randomTodo)).not.toBeAttached();
    });

    test('should delete multiple todos one by one', async () => {
        for (const todoItem of TODO_ITEMS) {
            await todoPage.deleteTodo(todoItem);
            await expect(todoPage.todoItemByText(todoItem)).not.toBeAttached();
        }
    });

});