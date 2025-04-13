import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
	// Elements
	private todoInput = this.page.getByTestId('text-input');
	private todoItemLabel = this.page.getByTestId('todo-item-label');

	// Actions
	async addTodo(todo: string) {
		await this.todoInput.fill(todo);
		await this.page.keyboard.press('Enter');
	}
}
