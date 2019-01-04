import UserReducer, { initialState } from './UserReducer';
import { Authorize, Logout } from './UserActions';

export const fakeData = {
	token: 'token!',
	username: 'username',
	email: 'email!',
	ID: 2,
};

describe('user reducer', () => {
	it('should return the initial state', () => {
		expect(UserReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle authorize action', () => {
		const createdAction = Authorize(fakeData);
		expect(UserReducer(initialState, createdAction)).toEqual({
			...initialState,
			user: {
				...initialState.user,
				...fakeData,
			},
		});
	});

	it('should handle logout action', () => {
		const createdAction = Logout();
		expect(UserReducer(initialState, createdAction)).toEqual(initialState);
	});
});
