import { useEffect } from 'react';

export default function OnKeyPressComponent({ next, previous, children }) {
	function handleKeyDown(e) {
		if (e.code.includes('ArrowLeft')) previous();
		if (e.code.includes('ArrowRight')) next();
	}
	useEffect(() => {
		document.addEventListener('keyup', handleKeyDown);
		return function cleanup() {
			document.removeEventListener('keyup', handleKeyDown);
		};
	});
	return children;
}