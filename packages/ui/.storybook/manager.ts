import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

export const strTheme = create({
	base: 'light',
	brandTitle: 'My custom Storybook',
	brandUrl: 'https://example.com',
	brandTarget: '_self',
});

addons.setConfig({
	isFullScreen: false,
	showNav: true,
	showPanel: true,
	panelPosition: 'right',
	sortStoriesByKind: false,
	sidebarAnimations: false,
	enableShortcuts: true,
	sidebar: {
		showRoots: true,
	},
	theme: strTheme,
});
