'use client';

import { useAtom } from 'jotai';
import Link from 'next/link';
import { CalendarArrowUp, CalendarArrowDown } from 'lucide-react';
import { todosAtom, sortAscAtom } from '@/lib/atoms';
import { Button, Toggle } from '@todos/ui';

interface TodoFooterProps {
	filter: string;
}

const TodoFooter = ({ filter }: TodoFooterProps) => {
	const [todos, setTodos] = useAtom(todosAtom);
	const [sort, setSort] = useAtom(sortAscAtom);

	const leftTodo = todos.filter((todo) => !todo.completed);

	const handleClearCompleted = () => {
		setTodos(leftTodo);
	};

	const Icon = sort ? CalendarArrowUp : CalendarArrowDown;

	return (
		<div
			id="todo-footer"
			className="flex justify-between items-center p-4 text-sm">
			<span className="font-light">{leftTodo.length} item left</span>
			<div className="flex">
				<Toggle asChild pressed={filter === 'all'} size="sm">
					<Link href="/">All</Link>
				</Toggle>
				<Toggle pressed={filter === 'active'} size="sm">
					<Link href="/?filter=active">Active</Link>
				</Toggle>
				<Toggle pressed={filter === 'completed'} size="sm">
					<Link href="/?filter=completed">Completed</Link>
				</Toggle>
				<Toggle pressed={sort} size="sm" onClick={() => setSort(!sort)}>
					<Icon size={20} strokeWidth={2} />
				</Toggle>
			</div>
			<Button
				disabled={todos.length - leftTodo.length === 0}
				variant="ghost"
				size="sm"
				onClick={handleClearCompleted}>
				Clear completed
			</Button>
		</div>
	);
};

export default TodoFooter;
