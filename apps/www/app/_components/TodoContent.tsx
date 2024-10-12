import { useAtom } from 'jotai';
import { todosAtom } from '@/lib/atoms';
import TodoItem from './TodoItem';

interface TodoContentProps {
	filter: string;
	sort: string;
}

const TodoList = ({ filter, sort }: TodoContentProps) => {
	const [todos] = useAtom(todosAtom);

	const sortedTodos = todos
		.filter((todo) => {
			if (filter === 'active') return !todo.completed;
			if (filter === 'completed') return todo.completed;
			return true; // 'all' case
		})
		.sort((a, b) => {
			const [_a, _b] = sort === 'asc' ? [a, b] : [b, a];
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
