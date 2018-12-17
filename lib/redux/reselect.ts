import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import { UserData } from './reducers/User/UserReducer';
import { LayoutType } from './reducers/Layout/LayoutReducer';

export const getCartState = state => state.cart;
export const getUserData = state => state.user;
export const getLayout = state => state.layout;

export const getUserAndLayout = createStructuredSelector({
	user: getUserData,
	layout: getLayout,
});

export const getCart = createStructuredSelector({
	cart: getCartState,
});

export type getUserAndLayoutType = {
	user: UserData;
	layout: LayoutType;
	// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9611
	dispatch?: Dispatch<any>;
};
