import React from 'react';
import {
	connect as originalConnect,
	MapDispatchToPropsParam,
	MapStateToPropsParam,
	MergeProps,
	Options,
} from 'react-redux';

import { Dispatch, bindActionCreators } from 'redux';

export const mapDispatchToProps = actionCreators => (dispatch: Dispatch) =>
	bindActionCreators(actionCreators, dispatch);

export type InferableComponentEnhancerWithProps < TInjectedProps , TNeedsProps > = <
	TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>
>(
	component: TComponent
) => TComponent;

interface MyConnect {
	<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
		mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, object>,
		mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
	): InferableComponentEnhancerWithProps<
		TStateProps & TDispatchProps,
		TOwnProps
	>;

	<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
		mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, object>,
		mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
		mergeProps?: MergeProps<
		TStateProps,
		TDispatchProps,
		TOwnProps,
		TMergedProps
		>,
		options?: Options<TStateProps, TOwnProps, TMergedProps>
	): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
}

export const connect = originalConnect as MyConnect;
