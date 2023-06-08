/* eslint-disable */
import { useState } from 'react';

// Custom hook for handling gallery display and tab clicks
export default props => {
	const [showGallery, setShowGallery] = useState({
		show: false,
		image: ''
	});

	// Toggle the showGallery state and set the selected image
	const handleShowGallery = image =>
		setShowGallery(prev => ({
			show: !prev.show,
			image: image
		}));

	// Handle tab click events
	const handleClick = event => {
		var children = document.getElementById('tabs').childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].classList) {
				children[i].childNodes[0].removeAttribute('aria-selected');
				children[i].classList.remove('is-active');
				const parentActive = document.getElementById(
					children[i].childNodes[0].getAttribute('data-tabs-target')
				);
				if (parentActive.classList) parentActive.classList.remove('is-active');
			}
		}
		const div = document.getElementById(event.target.getAttribute('data-tabs-target'));
		event.target.setAttribute('aria-selected', 'true');
		div.classList.add('is-active');
	};

	// Return the custom hook's state and methods
	return {
		showGallery: showGallery,
		handleShowGallery: handleShowGallery,
		handleClick: handleClick
	};
};
