import { Loader } from 'lucide-react';

export const Spinner = () => {
	return (
		<div className="flex justify-center py-8 px-4">
			<Loader className="h-8 w-8 text-primary animate-spin" />
		</div>
	);
};

export default Spinner;
