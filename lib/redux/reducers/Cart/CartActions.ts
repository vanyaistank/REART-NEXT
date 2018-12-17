import { action } from 'typesafe-actions';
import * as actionTypes from './CartConstants';

export const AddToCart = (id: number, isUnique: boolean) =>
	action(actionTypes.ADD_TO_CART, { id, isUnique });