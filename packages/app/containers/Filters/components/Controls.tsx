import React from 'react';
import { Row, Col, Input, Heading, Select } from '@Components';

interface Props {
	handleSearch: (any) => void;
	handleFilters: () => void;
	showFilters: boolean;
	searchText: string;
}

const options = [
	{ value: 'Newest', label: 'Newest' },
	{ value: 'Lower Price', label: 'Lower Price' },
	{ value: 'Higher Price', label: 'Higher Price' },
];

const Controls: React.SFC<Props> = ({
	handleSearch,
	handleFilters,
	showFilters,
	searchText,
}) => (
	<Row marginTop="50px">
		<Col
			size={3}
			sizeL={6}
			sizeMd={6}
			sizeSm={12}
			deviceOrder={2}
			marginBottom="30px"
			justifyContent="center"
		>
			<Heading inline lighterGray size="S" onClick={handleFilters}>
				{showFilters ? '< HIDE FILTERS' : '> SHOW FILTERS'}
			</Heading>
		</Col>
		<Col
			size={6}
			sizeL={12}
			sizeMd={12}
			sizeSm={12}
			deviceOrder={1}
			marginBottom="30px"
			justifyContent="center"
		>
			<Input
				centered
				name="search"
				value={searchText}
				type="text"
				placeholder="Search..."
				onChange={e => handleSearch(e)}
			/>
		</Col>
		<Col
			right
			size={3}
			sizeL={6}
			sizeMd={6}
			sizeSm={12}
			deviceOrder={3}
			marginBottom="30px"
			justifyContent="center"
		>
			<Select
				placeholder="Sort by..."
				options={options}
				onChange={e => console.log(e)}
			/>
		</Col>
	</Row>
);

export default Controls;
