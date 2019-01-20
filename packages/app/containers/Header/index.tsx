import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUserAndLayout, getUserAndLayoutType } from '@Redux/reselect';

import { mapDispatchToProps } from '@Redux/helpers';

import { ToggleModal, ToggleMenu } from '@Redux/reducers/Layout/LayoutActions';
import { Logout } from '@Redux/reducers/User/UserActions';

import Header from './components';

interface Props {
	toggleModal: () => void;
	toggleMenu: () => void;
	handleLogout: () => void; // log out user
	noBottomMargin: boolean; // disable margin-bottom, e.g. profile page
}

class HeaderContainer extends PureComponent<getUserAndLayoutType & Props> {
	render() {
		const {
			toggleModal,
			toggleMenu,
			handleLogout,
			noBottomMargin,
			layout: { showMenu },
			user: { token },
		} = this.props;
		return (
			<Header
				showMenu={showMenu}
				toggleModal={toggleModal}
				toggleMenu={toggleMenu}
				handleLogout={handleLogout}
				noBottomMargin={noBottomMargin}
				token={token}
			/>
		);
	}
}

const actionCreators = {
	toggleModal: ToggleModal,
	toggleMenu: ToggleMenu,
	handleLogout: Logout,
};

export default connect(
	getUserAndLayout,
	mapDispatchToProps(actionCreators),
)(HeaderContainer);
