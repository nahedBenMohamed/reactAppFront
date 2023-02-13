import React from 'react';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import HomePageSliderComponent from '../../components/HomePageSliderComponent';
import CardsHomeContainer from '../../containers/CardsHomeContainer';
import BookHomeContainer from '../../containers/BookHomeContainer';
import { TestimonialsHomeContainer } from '../../containers/TestimonialsHomeContainer';
import HomeTestimonialsSliderComponent from '../../components/HomePageSliderComponent';

const HomePage = ({ t }) => {

	return (
		<section>
			<HomePageSliderComponent t={t} />
			<CardsHomeContainer t={t} />
			<TestimonialsHomeContainer t={t}/>
			<BookHomeContainer t={t} />
		</section>
	);
}

export default HomePage;
