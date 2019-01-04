/* eslint-disable */
import produce from 'immer';

import * as actionTypes from './LayoutConstants';
import * as actions from './LayoutActions';
import { ActionType } from 'typesafe-actions';

export type LayoutType = {
	showModal: boolean;
	showMenu: boolean;
};

export const initialState: LayoutType = {
	showModal: false,
	showMenu: false,
};

type LayoutActions = ActionType<typeof actions>;

const LayoutReducer = (state = initialState, action: LayoutActions) =>
	produce(state, draft => {
		const handleToggle = (
			draft: LayoutType,
			disableParam: string,
			enableParam: string
		) => {
			if (draft[disableParam]) {
				draft[disableParam] = !draft[disableParam];
			}

			draft[enableParam] = !draft[enableParam];

			return draft;
		};

		switch (action.type) {
			case actionTypes.TOGGLE_MODAL:
				return handleToggle(draft, 'showMenu', 'showModal');
			case actionTypes.TOGGLE_MENU:
				return handleToggle(draft, 'showModal', 'showMenu');
		}
	});

export default LayoutReducer;
