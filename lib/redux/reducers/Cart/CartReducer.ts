import { ActionType } from 'typesafe-actions';
import {ADD_TO_CART} from '@Redux/reducers/Cart/CartConstants';
import * as actions from './CartActions';

type CartActions = ActionType<typeof actions>;

const initialState = {
	addedIds: [],
	quantityById: {},
};

const addedIds = (state = initialState.addedIds, action: CartActions) => {
	const {
		payload: {
			id,
		},
	} = action;

	switch (action.type) {
		case ADD_TO_CART:
			if (state.indexOf(id) !== -1) {
				return state;
			}

			return [
				...state,
				id,
			];

		default:
			return state
	}
};

const quantityById = (state = initialState.quantityById, action: CartActions) => {
	switch (action.type) {
		case ADD_TO_CART:
			const {
				payload: {
					id,
					isUnique,
				},
			} = action;

			if (isUnique === true) {
				return {
					...state,
					[id]: 1,
				};
			}

			return {
				...state,
				[id]: (state[id] || 0) + 1
			};

		default:
			return state;
	}
};

const cartReducer = (state = initialState, action: CartActions) => {
	// TODO: add checkout status actions
	switch (action.type) {
		case ADD_TO_CART:
			return {
				addedIds: addedIds(state.addedIds, action),
				quantityById: quantityById(state.quantityById, action)
			};
		default:
			return state;
	}
};

export default cartReducer;