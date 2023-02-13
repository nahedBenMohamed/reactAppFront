import React from 'react';

export default function PdssImageComponent({ path, alt }) {
	return (
		<div className="cell medium-4">
			<img src={'/files/images/landingpage/' + path} alt={alt} />
		</div>
	);
}
