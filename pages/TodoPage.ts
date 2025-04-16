import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
	// Elements
	private todoInputField() {
		return this.page.getByTestId('text-input');
	}

	private todoItem() {
		return this.page.getByTestId('todo-item');
	}

	public todoItemByText(text: string) {
		return this.todoItem().filter({ has: this.todoItemLabelByText(text) });
	}

	public todoItemLabel() {
		return this.page.getByTestId('todo-item-label');
	}

	public todoItemLabelByText(text: string) {
		return this.todoItemLabel().filter({ hasText: text });
	}

	private todoItemCheckbox() {
		return this.page.getByTestId('todo-item-toggle');
	}

    private todoItemCount() {
        return this.page.locator('.todo-count');
    }

    private todoList() {
        return this.page.getByTestId('todo-list');
    }

	// Actions
	async addTodo(todo: string) {
		await this.todoInputField().fill(todo);
		await this.page.keyboard.press('Enter');
	}

	async checkTodo(todo: string) {
		const todoItemCheckbox = this.todoItemByText(todo).locator(
			this.todoItemCheckbox()
		);

		if (!(await todoItemCheckbox.isChecked())) {
			todoItemCheckbox.click();
		} 
	}

    async uncheckTodo(todo: string) {
        const todoItemCheckbox = this.todoItemByText(todo).locator(
			this.todoItemCheckbox()
		);

        if ((await todoItemCheckbox.isChecked())) {
			todoItemCheckbox.click();
		} 
    }

    async getTodoItemCount(): Promise<number> {
        const textContent = await this.todoItemCount().textContent() || "null";
        const itemCount = parseInt(textContent.charAt(0));
        return itemCount;
    }
}
