'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { ChevronDown } from 'lucide-react';
import { Button } from '@todos/ui';
import { todosAtom } from '@/lib/atoms';
import { cn } from '@todos/utils';

interface TodoHeaderProps {
	filter: string;
}

const TodoHeader = ({ filter }: TodoHeaderProps) => {
	const [newTodo, setNewTodo] = useState('');
	const [todos, setTodos] = useAtom(todosAtom);
	const [toggleButtonState, setToggleButtonState] = useState(true);

	useEffect(() => {
		const completedCount = todos.filter((todo) => todo.completed).length;
		const totalCount = todos.length;

		if (filter === 'completed') {
			setToggleButtonState(true);
		} else if (filter === 'active') {
			setToggleButtonState(false);
		} else if (completedCount === totalCount) {
			setToggleButtonState(true);
		} else {
			setToggleButtonState(false);
		}
	}, [todos, filter]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTodo.trim()) return;

		setTodos([
			...todos,
			{ id: Date.now(), text: newTodo, completed: filter === 'completed' },
		]);
		setNewTodo('');
	};

	const handleToggleAll = () => {
		if (filter === 'completed') {
			setTodos(todos.map((todo) => ({ ...todo, completed: false })));
		} else if (filter === 'active') {
			setTodos(todos.map((todo) => ({ ...todo, completed: true })));
		} else {
			setTodos(
				todos.map((todo) => ({ ...todo, completed: !toggleButtonState }))
			);
		}
	};

	return (
		<div
			id="todo-header"
			className="relative flex items-center justify-between">
			<div className="flex items-center justify-center absolute left-0 px-4  h-full">
				{todos.length !== 0 && (
					<Button
						variant="text"
						size="icon"
						className={cn(!toggleButtonState && 'text-muted-foreground/60')}
						onClick={handleToggleAll}>
						<ChevronDown />
					</Button>
				)}
			</div>
			<form onSubmit={handleSubmit} className="flex flex-grow">
				<input
					className="w-full text-2xl p-4 pl-14 border shadow-inner box-border"
					placeholder="What needs to be done?"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default TodoHeader;
