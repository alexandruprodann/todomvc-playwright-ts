import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem, setupTodos } from '../utils/todoUtils';

test.describe('Tests for deleting todos', () => {
    let todoPage: TodoPage;
    const randomTodo: string = getRandomTodoItem();
 
    test.beforeEach(async ({ page }) => {
        todoPage = await setupTodos(page);
    });

    test('@smoke - should delete a single todo item', async () => {
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