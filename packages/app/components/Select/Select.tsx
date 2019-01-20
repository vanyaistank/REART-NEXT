import React from 'react';
import Select from 'react-select';
import { lighten } from 'polished';
import { colors } from '@Styled/theme';

const customStyles = {
	option: base => ({
		...base,
		width: '100%',
		borderRadius: '3px',
		borderBottom: '1px solid white',
		color: colors.white,
		fontWeight: 700,
		fontFamily: 'Lato, sans-serif',
		backgroundColor: colors.lighterMain,
		padding: 20,
		outline: 'none',
		cursor: 'pointer',
		transition: '0.2s ease-in-out background-color',
		':hover': {
			backgroundColor: lighten(0.1, colors.lighterMain),
		},
	}),
	control: base => ({
		...base,
		border: `1px solid ${colors.lighterGray} !important`,
		outline: 'none',
		boxShadow: `0 0 0 1px ${colors.main} !important`,
		':active': {
			boxShadow: `0 0 0 1px ${colors.lighterGray}`,
		},
		':hover': {
			boxShadow: `0 0 0 1px ${colors.lighterGray}`,
		},
	}),
	singleValue: (base, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...base, opacity, transition };
	},
};

type Option = {
	value: string;
	label: string;
};

interface Props {
	options: Array<Option>;
	placeholder: string;
	styles?: object;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const StyledSelect: React.SFC<Props> = ({
	options,
	styles,
	onChange,
	placeholder,
}) => {
	const styleBag = {
		...customStyles,
		...(styles != null && styles),
	};

	return (
		<Select
			placeholder={placeholder}
			onChange={onChange}
			options={options}
			styles={styleBag}
		/>
	);
};

export default StyledSelect;
