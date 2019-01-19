import { darken } from 'polished';
import { css } from 'styled-components';

// for styled-props module
interface colorsInterface {
	white: boolean;
	black: boolean;
	lighterGray: boolean;
	purple: boolean;
	darkPurple: boolean;
	transparent: boolean;
	red: boolean;
	main: boolean;
	lighterMain: boolean;
	border: boolean;
	lightenBorder: boolean;
}

export type colorsPartialInterface = Partial<colorsInterface>;

const colors = {
	white: '#ffffff',
	gray: '#e2e2e2',
	black: '#000000',
	lighterGray: '#707070',
	purple: '#6C5FC7',
	darkPurple: '#5346AE',
	transparent: 'transparent',
	red: '#d81717',
	main: '#171717',
	lighterMain: '#222',
	border: '#333',
	lightenBorder: '#5d5d5d',
};

const background = {
	invertedPurple: colors.transparent,
	purple: colors.purple,
	disabled: colors.gray,
	loading: colors.gray,
	main: colors.main,
	lighterMain: colors.lighterMain,
	border: colors.border,
	lightenBorder: colors.lightenBorder,
};

const hoverBackground = {
	invertedPurple: colors.purple,
	purple: colors.darkPurple,
	disabled: colors.gray,
	loading: colors.gray,
	main: colors.lighterMain,
};

const activeBackground = {
	invertedPurple: colors.darkPurple,
	purple: darken(0.1, colors.darkPurple),
	disabled: colors.gray,
	loading: colors.gray,
};

const buttonTextColor = {
	invertedPurple: colors.purple,
	purple: colors.white,
	disabled: colors.white,
	loading: colors.white,
};

const fontSize = {
	XL: '40px',
	L: '30px',
	M: '17px',
	S: '15px',
};

const headingMargin = {
	XL: '50px',
	L: '20px',
	M: '15px',
	S: '10px',
};

const borderColor = {
	invertedPurple: colors.purple,
	purple: colors.purple,
	disabled: colors.gray,
};

const MediaSizes = {
	desktop: 1190,
	tablet: 960,
	mobile: 630,
	small: 320,
};

const media: any = Object.keys(MediaSizes).reduce((acc, label) => {
	acc[label] = (literals: TemplateStringsArray, ...args: any[]) => css`
		@media (max-width: ${MediaSizes[label] / 16}em) {
			${css(literals, ...args)};
		}
	`;

	return acc;
}, {});

export {
	colors,
	background,
	buttonTextColor,
	borderColor,
	hoverBackground,
	activeBackground,
	fontSize,
	headingMargin,
	media,
};