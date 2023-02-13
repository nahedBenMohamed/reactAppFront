import { useEffect } from 'react';

export default function OnKeyPressComponent({ next, previous, children }) {
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.code.includes('ArrowLeft')) previous();
			if (e.code.includes('ArrowRight')) next();
		}
		document.addEventListener('keydown', handleKeyDown);
		return function cleanup() {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
	return children;
}
