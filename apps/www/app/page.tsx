'use client';
import { useSearchParams } from 'next/navigation';
import TodoHeader from './_components/TodoHeader';
import TodoContent from './_components/TodoContent';
import TodoFooter from './_components/TodoFooter';

export default function Page() {
	const searchParams = useSearchParams();

	// Получение фильтра из query параметров
	const filter = searchParams.get('filter') || 'all';

	return (
		<div className="todo_container flex flex-col rounded-lg border	background bg-card text-card-foreground shadow-sm">
			<TodoHeader filter={filter} />
			<TodoContent filter={filter} />
			<TodoFooter filter={filter} />
		</div>
	);
}
