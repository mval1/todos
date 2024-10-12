'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@todos/ui';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			size="icon"
			variant="ghost"
			className="rounded-full">
			<Moon className="size-5 block dark:hidden" />
			<Sun className="dark:block hidden size-5" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};

export default ToggleTheme;
