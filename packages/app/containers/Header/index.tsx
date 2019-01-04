import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getUserAndLayout, getUserAndLayoutType } from '@Redux/reselect';

import { mapDispatchToProps } from '@Redux/helpers';

import { ToggleModal, ToggleMenu } from '@Redux/reducers/Layout/LayoutActions';
import { Logout } from '@Redux/reducers/User/UserActions';

import Header from './components';

interface Actions {
	toggleModal: () => void;
	toggleMenu: () => void;
	handleLogout: () => void; // log out user
}

class HeaderContainer extends PureComponent<getUserAndLayoutType & Actions> {
	render() {
		const {
			toggleModal,
			toggleMenu,
			handleLogout,
			layout: { showMenu },
			user: { token },
		} = this.props;

		return (
			<Header
				showMenu={showMenu}
				toggleModal={toggleModal}
				toggleMenu={toggleMenu}
				handleLogout={handleLogout}
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
	mapDispatchToProps(actionCreators)
)(HeaderContainer);
