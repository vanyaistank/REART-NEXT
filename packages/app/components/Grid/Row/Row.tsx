import styled, { css } from 'styled-components';

interface Props {
	marginTop?: string;
	marginBottom?: string;
	justifyContent?: 'flex-end' | 'center' | 'space-between' | 'space-around';
}

const StyledRow = styled.div`
	${(props: Props) => css`
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		margin-top: ${props.marginTop && props.marginTop};
		margin-bottom: ${props.marginBottom && props.marginBottom};
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: ${props.justifyContent && props.justifyContent};
	`};
`;

export default StyledRow;
