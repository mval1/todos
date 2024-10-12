import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Provider } from 'jotai';
import { cn } from '@todos/utils';
import { ThemeProvider } from '@todos/ui';
import ToggleTheme from '@/components/ToggleTheme';
import Spinner from '@/components/Spinner';

import type { Metadata } from 'next';

import '../styles/index.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
	title: 'Todos',
	description: 'Управление списком задач.',
	keywords:
		'todo, управление задачами, продуктивность, напоминания, организация задач, список дел',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background', inter.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
					<Provider>
						<main className="max-w-xl mx-auto mt-10 p-2">
							<div className="flex justify-center my-8">
								<h1 className="font-thin">todos</h1>
							</div>
							<Suspense fallback={<Spinner />}>{children}</Suspense>
							<div className="flex justify-center my-8">
								<ToggleTheme />
							</div>
						</main>
					</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
