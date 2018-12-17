import React from 'react';

const Plus = props => (
	<svg
		width={16}
		height={16}
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<defs>
			<path
				d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h4v2h-4v4h-2v-4H7v-2h4V7h2v4z"
				id="a"
			/>
		</defs>
		<use
			fill="gray"
			transform="rotate(90 12 8)"
			xlinkHref="#a"
			fillRule="evenodd"
		/>
	</svg>
);

export default Plus;
