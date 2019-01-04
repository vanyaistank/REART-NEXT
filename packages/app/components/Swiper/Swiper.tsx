import React from 'react';
import Slider from 'react-id-swiper';
import { Row, Col } from '@Components';

interface Props {
	slidesPerView?: number;
	spaceBetween?: number;
}

const Swiper: React.SFC<Props> = ({
	children,
	slidesPerView,
	spaceBetween,
}) => {
	const SliderParams = {
		containerClass: 'swiper',
		spaceBetween,
		slidesPerView,
	};

	return (
		<Row>
			<Col size={12} noMobilePadding>
				<Slider {...SliderParams}>{children}</Slider>
			</Col>
		</Row>
	);
};

Swiper.defaultProps = {
	spaceBetween: 50,
	slidesPerView: 1,
};

export default Swiper;
