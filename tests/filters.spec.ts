import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for filtering todos', () => {
    let todoPage: TodoPage;
    let randomTodo: string = TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];

    enum Status {
        ALL = "All",
        ACTIVE = "Active",
        COMPLETED = "Completed"
    }      
 
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        todoPage = new TodoPage(page);

        for (const todoItem of TODO_ITEMS) {
            await todoPage.addTodo(todoItem);
        }
    });

    test('should show all todos when "All" filter is selected', async () => {
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

});