import React from 'react';

const Logout = props => (
	<svg
		width={18}
		height={20}
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<title>icn/entrance</title>
		<defs>
			<path
				d="M6 2h12c1.11 0 2 .89 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.974h2V20h12V4H6v2H4V4a2 2 0 0 1 2-2zm3.243 9L7.414 9.172l1.414-1.415L13.071 12l-4.243 4.243-1.414-1.415L9.243 13H2v-2h7.243z"
				id="a"
			/>
		</defs>
		<g transform="translate(-2 -2)" fill="none" fillRule="evenodd">
			<mask id="b" fill="#fff">
				<use xlinkHref="#a" />
			</mask>
			<use fill="#000" fillRule="nonzero" xlinkHref="#a" />
			<g mask="url(#b)" fill="#000">
				<path d="M0 0h24v24H0z" />
			</g>
		</g>
	</svg>
);

export default Logout;
