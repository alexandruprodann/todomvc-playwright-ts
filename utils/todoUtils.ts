import { Page } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODO_ITEMS } from '../utils/testData';

export function getRandomTodoItem() {
	return TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];
}

export async function setupTodos(page: Page) {
    await page.goto('');
    let todoPage = new TodoPage(page);

    for (const todoItem of TODO_ITEMS) {
        await todoPage.addTodo(todoItem);
    }

    return todoPage;
}