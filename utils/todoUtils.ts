import { TODO_ITEMS } from '../utils/testData';

export function getRandomTodoItem() {
	return TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];
}