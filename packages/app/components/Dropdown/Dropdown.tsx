import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import styled from 'styled-components';
import { colors } from '@Styled/theme';
import { Heading, Icon } from '@Components';
import { ListOfIcons } from '../Icon/Icon';

interface Props {
	children: React.ReactNode;
	renderTitle: () => React.ReactNode;
	options: {
		title: string;
		icon: ListOfIcons;
		onClick: () => void;
	}[];
}

interface OptionProps {
	isLogout?: boolean;
	onClick?: () => void;
	icon: ListOfIcons;
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

const ListWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	background-color: ${colors.lighterMain};
	transition: 0.2s ease-in-out;
	overflow: hidden;
	:hover {
		background-color: ${colors.main};
	 	border-left: 3px solid ${colors.purple};
	}
}`;

const Option: React.SFC<OptionProps> = ({ children, icon, isLogout, onClick }) => (
	<ListWrapper role="button" onClick={onClick}>
		<Icon awesome icon={icon} />
		<Heading
			centered
			bold
			white={!isLogout}
			red={isLogout}
			marginTop="0px"
			marginBottom="0px"
			size="S"
		>
			{children}
		</Heading>
	</ListWrapper>
);

class Dropdown extends Component<Props, State> {
	static defaultProps = {
		options: [],
	};

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
		const { renderTitle, options } = this.props;
		const { isOpen } = this.state;

		return (
			<DropdownContainer>
				<div role="button" onClick={this.handleToggle}>
					{renderTitle()}
				</div>
				{isOpen && (
					<DropdownList>
						{options.map(({ title, icon, onClick, ...rest }) => (
							<Option
								onClick={onClick}
								icon={icon}
								{...rest}
							>
								{title}
							</Option>
						))}
					</DropdownList>
				)}
			</DropdownContainer>
		);
	}
}

export default enhanceWithClickOutside(Dropdown);
