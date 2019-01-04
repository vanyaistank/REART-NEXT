import LayoutReducer, { initialState } from './LayoutReducer';
import { ToggleModal, ToggleMenu } from './LayoutActions';

describe('layout reducer', () => {
	it('should return the initial state', () => {
		expect(LayoutReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle toggle modal action', () => {
		const createdAction = ToggleModal();
		expect(LayoutReducer(initialState, createdAction)).toEqual({
			...initialState,
			showModal: true,
		});
	});

	it('should handle toggle menu action', () => {
		const createdAction = ToggleMenu();
		expect(LayoutReducer(initialState, createdAction)).toEqual({
			...initialState,
			showMenu: true,
		});
	});
});
