import React from 'react';
import { ChevronRight, Loader, Mail } from 'lucide-react';

import { Button } from '../../src/components/ui/button';

export default {
	title: 'Displays/ Button',
	component: Button,
};

export function ButtonDemo() {
	return <Button> Button</Button>;
}

export function ButtonAsChild() {
	return (
		<Button asChild>
			<a href="/login">Login</a>
		</Button>
	);
}

export function ButtonVariant() {
	return (
		<>
			<Button>Button</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="link">Link</Button>
			<Button variant="outline" size="icon">
				<ChevronRight className="h-4 w-4" />
			</Button>
			<Button disabled>
				<Loader className="mr-2 h-4 w-4 animate-spin" />
				Please wait
			</Button>
			<Button>
				<Mail className="mr-2 h-4 w-4" /> Login with Email
			</Button>
		</>
	);
}
