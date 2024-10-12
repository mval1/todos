import { atomWithStorage } from 'jotai/utils';

export interface ITodo {
	id: number;
	text: string;
	completed: boolean;
}

export const todosAtom = atomWithStorage<ITodo[]>('todo_app', [
	{ id: 1728754346488, text: 'Текстовое задание', completed: false },
	{ id: 1728754350549, text: 'Прекрасный код', completed: true },
	{ id: 1728754367976, text: 'Покрытие тестами', completed: false },
]);

export const sortAscAtom = atomWithStorage('todo_sort', false);
