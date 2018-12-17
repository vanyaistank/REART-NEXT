import { action } from 'typesafe-actions';
import * as actionTypes from './LayoutConstants';

export const ToggleModal = () => action(actionTypes.TOGGLE_MODAL);

export const ToggleMenu = () => action(actionTypes.TOGGLE_MENU);
