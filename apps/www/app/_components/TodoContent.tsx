import { useAtom } from 'jotai';
import { todosAtom, sortAscAtom } from '@/lib/atoms';
import TodoItem from './TodoItem';

interface TodoContentProps {
	filter: string;
}

const TodoList = ({ filter }: TodoContentProps) => {
	const [todos] = useAtom(todosAtom);
	const [sort] = useAtom(sortAscAtom);

	const sortedTodos = todos
		.filter((todo) => {
			if (filter === 'active') return !todo.completed;
			if (filter === 'completed') return todo.completed;
			return true; // 'all' case
		})
		.sort((a, b) => {
			const [_a, _b] = sort ? [a, b] : [b, a];
			return new Date(_a.id).getTime() - new Date(_b.id).getTime();
		});

	return (
		<ul id="todo-list">
			{sortedTodos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export default TodoList;
