import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ITodo, todosAtom } from '@/lib/atoms';
import { Checkbox, Button } from '@todos/ui';
import { cn } from '@todos/utils';
import { XIcon } from 'lucide-react';

interface TodoProps {
	todo: ITodo;
}

interface FormValues {
	editText: string;
}

const editSchema = z.object({
	editText: z.string().min(1, 'Todo text is required'),
});

const TodoItem = ({ todo }: TodoProps) => {
	const [todos, setTodos] = useAtom(todosAtom);
	const [isEditing, setIsEditing] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: { editText: todo.text },
		resolver: zodResolver(editSchema),
	});

	const inputRef = useRef<HTMLInputElement | null>(null);
	const editText = watch('editText');

	const handleEditClick = () => setIsEditing(true);
	const handleEditKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			setIsEditing(true);
		}
	};

	const handleEdit = () => {
		setIsEditing(false);
		setTodos(
			todos.map((t) => (t.id === todo.id ? { ...t, text: editText } : t))
		);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Tab') {
			setIsEditing(false);
			setValue('editText', todo.text);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
			setIsEditing(false);
			setValue('editText', todo.text);
		}
	};

	useEffect(() => {
		if (isEditing) {
			if (inputRef.current) {
				inputRef.current.focus();
			}

			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isEditing]);

	return (
		<li
			id="todo-item"
			className={`cursor-pointer ${todo.completed ? 'completed' : ''}`}>
			<div className="flex items-center justify-between relative border-b border-default text-x p-4 gap-6">
				<Checkbox
					name="todo-item-checkbox"
					value={1}
					checked={todo.completed}
					onCheckedChange={() => {
						setTodos((prevTodos) =>
							prevTodos.map((t) =>
								t.id === todo.id ? { ...t, completed: !t.completed } : t
							)
						);
					}}
				/>

				{isEditing ? (
					<form onSubmit={handleSubmit(handleEdit)} className="w-full">
						<input
							className={cn(
								'w-full text-2xl p-4 border shadow-inner box-border',
								errors.editText && 'border-danger'
							)}
							{...register('editText')}
							ref={(e) => {
								register('editText').ref(e);
								inputRef.current = e;
							}}
							onKeyDown={handleKeyDown}
						/>
					</form>
				) : (
					<>
						<div
							className={cn(
								'flex-grow',
								todo.completed && 'line-through text-muted-foreground'
							)}
							role="button"
							tabIndex={0}
							onDoubleClick={handleEditClick}
							onKeyDown={handleEditKeyDown}>
							<span>{todo.text}</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full"
							onClick={() =>
								setTodos((prevTodos) =>
									prevTodos.filter((t) => t.id !== todo.id)
								)
							}>
							<XIcon
								className="h-4 w-4 fill-muted-foreground"
								strokeWidth={2}
							/>
						</Button>
					</>
				)}
			</div>
		</li>
	);
};

export default TodoItem;
