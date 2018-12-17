import { action } from 'typesafe-actions';
import * as actionTypes from './UserConstants';
import { UserData } from './UserReducer';

export const Authorize = (userData: UserData) =>
	action(actionTypes.AUTHORIZATION, userData);

export const Logout = () => action(actionTypes.LOGOUT);
