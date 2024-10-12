import * as React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { ThemeProvider } from '../src/components/ThemeProvider';

import type { Preview } from '@storybook/react';

import 'tailwindcss/tailwind.css';
import '../styles/global.css';

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			toolbar: {
				// The label to show for this toolbar item
				title: 'Theme',
				icon: 'circlehollow',
				// Array of plain string values or MenuItem shape (see below)
				items: ['light', 'dark'],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: 'light',
	},
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				method: 'alphabetical',
				order: ['Introduction', 'Examples', 'Shadcn', 'Colors', 'Typography'],
			},
		},
	},
};

// Decoradores: https://storybook.js.org/docs/react/writing-stories/decorators#page-top
export const decorators = [
	(Story) => {
		return (
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				disableTransitionOnChange
			>
				<div className="preview flex justify-center p-6 items-center">
					<Story />
				</div>
			</ThemeProvider>
		);
	},
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark',
		},
		defaultTheme: 'light',
	}),
];

export default preview;
