import React, { PureComponent } from 'react';
import { Swiper } from '@Components';
import Slide from './components/Slide';
// import Image from './components/Image';

// temporary
const mockImages = [
	{
		id: 0,
		url: 'https://pp.userapi.com/c7007/v7007477/37e0e/qbny9kC12nw.jpg',
		type: 'painting',
		title: 'Lorem Ipsum',
	},
	{
		id: 1,
		url: 'https://pp.userapi.com/c626121/v626121279/24f1e/4TRbwyimQjU.jpg',
		type: 'painting',
		title: 'Lorem Ipsum',
	},
	{
		id: 2,
		url: 'https://pp.userapi.com/c7008/v7008477/6bdb6/aRaLC8otx8E.jpg',
		type: 'painting',
		title: 'Lorem Ipsum',
	},
];

export default class Spotlight extends PureComponent {
	renderSlides = () =>
		// There's an issue typing components that return arrays
		// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26890
		mockImages.map(item => (
			<div key={item.id} className="swiper-slide">
				<Slide item={item} />
			</div>
		));

	render(): React.ReactNode {
		return <Swiper>{this.renderSlides()}</Swiper>;
	}
}
