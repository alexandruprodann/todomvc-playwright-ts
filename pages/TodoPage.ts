import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
	// Elements
    private todoInputField() {
        return this.page.getByTestId('text-input');
    }

    private todoItemLabel() {
        return this.page.getByTestId('todo-item-label');
    }

    public todoItemLabelByText(text: string) {
        return this.todoItemLabel().filter({ hasText: text });
    }

	// Actions
	async addTodo(todo: string) {
		await this.todoInputField().fill(todo);
		await this.page.keyboard.press('Enter');
	}
}
