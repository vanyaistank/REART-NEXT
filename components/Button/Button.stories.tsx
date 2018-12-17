// import React from 'react';
//
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
//
// import { Button } from '@Components';
//
// const ButtonStory = storiesOf('Button', module);
//
// const buttonProps = [
// 	{
// 		title: 'loading state, width 100%',
// 		width: '100%',
// 		loading: true,
// 	},
// 	{
// 		title: 'inverted dark color',
// 		invertedDark: true,
// 	},
// 	{
// 		title: 'inverted purple color',
// 		invertedPurple: true,
// 	},
// 	{
// 		title: 'dark color',
// 		dark: true,
// 	},
// 	{
// 		title: 'purple color',
// 		purple: true,
// 	},
// 	{
// 		title: 'disabled',
// 		disabled: true,
// 	},
// ];
//
// buttonProps.forEach(props =>
// 	ButtonStory.add(props.title, () => (
// 		<Button {...props} onClick={action('click')}>
// 			BUTTON
// 		</Button>
// 	))
// );
//
// // storiesOf('Button', module)
// // 	.add('loading state and width 100%', () => (
// // 		<Button width="100%" loading onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	))
// // 	.add('inverted dark color', () => (
// // 		<Button invertedDark onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	))
// // 	.add('inverted purple color', () => (
// // 		<Button invertedPurple onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	))
// // 	.add('dark color', () => (
// // 		<Button dark onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	))
// // 	.add('purple', () => (
// // 		<Button purple onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	))
// // 	.add('disabled', () => (
// // 		<Button disabled onClick={action('click')}>
// // 			BUTTON
// // 		</Button>
// // 	));
