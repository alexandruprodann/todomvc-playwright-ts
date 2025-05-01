import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';
import { getRandomTodoItem, setupTodos } from '../utils/todoUtils';

test.describe('Tests for filtering todos', () => {
    let todoPage: TodoPage;
    const randomTodo: string = getRandomTodoItem();

    enum Status {
        ALL = "All",
        ACTIVE = "Active",
        COMPLETED = "Completed"
    }      
 
    test.beforeEach(async ({ page }) => {
        todoPage = await setupTodos(page);
    });

    test('@smoke - should show all todos when "All" filter is selected', async () => {
        await todoPage.clickFilterBtn(Status.ALL);
        for (const todoItem of TODO_ITEMS) {
            await expect(todoPage.todoItemByText(todoItem)).toBeVisible();
        }
    });

    test('should show only active todos when "Active" filter is selected', async () => {
        await todoPage.checkTodo(randomTodo);
        await todoPage.clickFilterBtn(Status.ACTIVE)
        await expect(todoPage.todoItemByText(randomTodo)).not.toBeVisible();
    })
    
    test('should show only completed todos when "Completed" filter is selected', async () => {
        await todoPage.checkTodo(randomTodo);
        await todoPage.clickFilterBtn(Status.COMPLETED)
        await expect(todoPage.todoItemByText(randomTodo)).toBeVisible();
    })
});