import { ToggleModal, ToggleMenu } from './LayoutActions';
import * as actionTypes from './LayoutConstants';

describe('layout actions', () => {
	it('should create an toggle modal action', () => {
		const expectedAction = {
			type: actionTypes.TOGGLE_MODAL,
		};

		expect(ToggleModal()).toEqual(expectedAction);
	});

	it('should create an toggle menu action', () => {
		const expectedAction = {
			type: actionTypes.TOGGLE_MENU,
		};

		expect(ToggleMenu()).toEqual(expectedAction);
	});
});
