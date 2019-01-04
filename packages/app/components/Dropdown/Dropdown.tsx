import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import styled from 'styled-components';
import { colors } from '@Styled/theme';

interface Props {
	children: React.ReactNode;
	renderTitle: () => React.ReactNode;
}

interface State {
	isOpen: boolean;
}

const DropdownContainer = styled.div`
	position: relative;
`;

const DropdownList = styled.div`
	cursor: pointer;
	min-width: 170px;
	background-color: ${colors.gray};
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1);
	position: absolute;
	top: 40px;
	right: 0;
	z-index: 1000;
`;

// border-color: ${colors.white};
// border-style: solid;
// border-width: 2px;
// border-radius: 10px;

class Dropdown extends Component<Props, State> {
	state = {
		isOpen: false,
	};

	handleClickOutside() {
		const { isOpen } = this.state;

		if (isOpen === true) {
			return this.handleToggle();
		}
	}

	handleToggle = () => this.setState(state => ({ isOpen: !state.isOpen }));

	render() {
		const { children, renderTitle } = this.props;
		const { isOpen } = this.state;

		return (
			<DropdownContainer>
				<div role="button" onClick={this.handleToggle}>
					{renderTitle()}
				</div>
				{isOpen && <DropdownList>{children}</DropdownList>}
			</DropdownContainer>
		);
	}
}

export default enhanceWithClickOutside(Dropdown);