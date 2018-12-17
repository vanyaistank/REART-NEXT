import React from 'react';

const Question = props => (
	<svg
		width={16}
		height={16}
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<defs>
			<path
				d="M12 4c4.416 0 8 3.584 8 8s-3.584 8-8 8-8-3.584-8-8 3.584-8 8-8zm-1 13h2v-2h-2v2zm1-10c-1.658 0-3 1.392-3 3.111h1.5c0-.855.675-1.555 1.5-1.555s1.5.7 1.5 1.555c0 1.556-2.25 1.361-2.25 3.889h1.5c0-1.75 2.25-1.944 2.25-3.889C15 8.392 13.658 7 12 7z"
				id="a"
			/>
		</defs>
		<use
			fill="#000"
			fillRule="nonzero"
			xlinkHref="#a"
			transform="translate(-4 -4)"
		/>
	</svg>
);

export default Question;
