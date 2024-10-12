'use client';

import { useAtom } from 'jotai';
import { CalendarArrowUp, CalendarArrowDown } from 'lucide-react';
import { todosAtom } from '@/lib/atoms';
import { Button, Toggle } from '@todos/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface TodoFooterProps {
	filter: string;
	sort: string;
}

const TodoFooter = ({ filter, sort }: TodoFooterProps) => {
	const [todos, setTodos] = useAtom(todosAtom);

	const leftTodo = todos.filter((todo) => !todo.completed);

	const handleClearCompleted = () => {
		setTodos(leftTodo);
	};

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const Icon = sort === 'asc' ? CalendarArrowUp : CalendarArrowDown;

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	return (
		<div
			id="todo-footer"
			className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm wrap gap-2">
			<div className="flex items-center gap-4">
				<span className="font-light">{leftTodo.length} item left</span>

				<Toggle
					pressed={sort === 'asc'}
					size="sm"
					onClick={() => {
						router.push(
							pathname +
								'?' +
								createQueryString('sort', sort === 'asc' ? 'desc' : 'asc')
						);
					}}>
					<Icon size={20} strokeWidth={2} />
				</Toggle>
			</div>

			<div className="flex gap-2">
				<Toggle
					pressed={filter === 'all'}
					size="sm"
					onClick={() => {
						router.push(pathname);
					}}>
					All
				</Toggle>
				<Toggle
					pressed={filter === 'active'}
					size="sm"
					onClick={() => {
						router.push(pathname + '?' + createQueryString('filter', 'active'));
					}}>
					Active
				</Toggle>
				<Toggle
					pressed={filter === 'completed'}
					size="sm"
					onClick={() => {
						router.push(
							pathname + '?' + createQueryString('filter', 'completed')
						);
					}}>
					Completed
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
