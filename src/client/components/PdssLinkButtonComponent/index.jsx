import React from 'react';

export default function PdssLinkButtonComponent({ url, name }) {
	return (
		<a className="button" href={url} target="_blank">
			{name}
		</a>
	);
}
