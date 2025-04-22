import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

test.describe('Tests for editing todo text', () => {
    let todoPage: TodoPage;

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
        todoPage.clickFilterBtn(Status.ALL);
        for (const todoItem of TODO_ITEMS) {
            await expect(todoPage.todoItemByText(todoItem)).toBeVisible();
        }
    });


});