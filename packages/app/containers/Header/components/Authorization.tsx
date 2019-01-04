import React, { Fragment } from 'react';
import { Button, ShowOnMobile, HideOnMobile, Link } from '@Components';

const Authorization = ({ toggleModal }) => (
	<Fragment>
		<ShowOnMobile>
			{/* render login link instead of button on mobile devices */}
			<Link white onClick={toggleModal} size="S">
				LOGIN
			</Link>
		</ShowOnMobile>
		<HideOnMobile>
			<Button purple onClick={toggleModal} spacedLeft>
				LOGIN
			</Button>
		</HideOnMobile>
	</Fragment>
);

export default Authorization;
