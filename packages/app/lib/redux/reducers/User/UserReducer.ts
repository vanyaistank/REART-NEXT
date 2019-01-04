/* eslint-disable */
// TODO: well, immer doesn't work with redux-persist
// https://github.com/rt2zz/redux-persist/issues/747
// should I remove it then?
// import produce from 'immer';

import { ActionType } from 'typesafe-actions';
import * as actionTypes from './UserConstants';
import * as actions from './UserActions';

export type UserData = {
	token: string;
	username?: string;
	email?: string;
	ID?: number;
	firstName?: string;
	lastName?: string;
};

export const initialState: UserData = {
	token: null,
	username: '',
	email: '',
	ID: null,
	firstName: '',
	lastName: '',
};

type UserActions = ActionType<typeof actions>;

const userReducer = (state = initialState, action: UserActions) => {
	switch (action.type) {
		case actionTypes.AUTHORIZATION:
			return {
				...state,
				...action.payload,
			};
		case actionTypes.LOGOUT:
			return {
				...initialState
			};
		default:
			return state;
	}
};

export default userReducer;
