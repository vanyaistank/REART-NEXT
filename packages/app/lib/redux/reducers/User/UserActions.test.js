import { Authorize, Logout } from './UserActions';
import * as actionTypes from './UserConstants';

const fakeData = {
	token: 'token!',
	username: 'username',
	email: 'email!',
	ID: 2,
};

describe('layout actions', () => {
	it('should create an authorize modal action', () => {
		const expectedAction = {
			type: actionTypes.AUTHORIZATION,
			payload: fakeData,
		};

		expect(Authorize(fakeData)).toEqual(expectedAction);
	});

	it('should create an logout menu action', () => {
		const expectedAction = {
			type: actionTypes.LOGOUT,
		};

		expect(Logout()).toEqual(expectedAction);
	});
});
