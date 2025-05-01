import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { getRandomTodoItem, setupTodos } from '../utils/todoUtils';

test.describe('Tests for editing todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = getRandomTodoItem();
 
    test.beforeEach(async ({ page }) => {
        todoPage = await setupTodos(page);
    });

    test('@smoke - should be able to edit a todo', async () => {
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
        let whitespaceTodo: string = '    Whitespace Todo';
        await todoPage.editTodo(randomTodo, whitespaceTodo);
        await expect(todoPage.todoItemLabelByText(whitespaceTodo.trim())).toBeVisible();
    });

    test('should delete an empty edited todo', async () => {
        let emptyTodo: string = '    ';
        await todoPage.editTodo(randomTodo, emptyTodo);
        await expect(todoPage.todoItemByText(randomTodo)).not.toBeVisible();
    });

});