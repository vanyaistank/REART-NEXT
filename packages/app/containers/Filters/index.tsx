import React, { PureComponent, Fragment } from 'react';

import Controls from './components/Controls';
import FiltersBlock from './components/FiltersBlock';

interface State {
	showFilters: boolean;
	searchText: string;
}

export default class FiltersContainer extends PureComponent<any, State> {
	state = {
		showFilters: false,
		searchText: '',
	};

	handleSearch = e => {
		const {
			currentTarget: { value },
		} = e;
		this.setState({ searchText: value });
	}

	handleFilters = () =>
		this.setState(state => ({ showFilters: !state.showFilters }));

	render() {
		const { showFilters, searchText } = this.state;

		return (
			<Fragment>
				<Controls
					handleSearch={this.handleSearch}
					handleFilters={this.handleFilters}
					showFilters={showFilters}
					searchText={searchText}
				/>
				{showFilters && <FiltersBlock />}
			</Fragment>
		);
	}
}
