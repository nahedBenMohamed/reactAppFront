import React, { useEffect, useState } from 'react';
import config from '../../../config';
import routes from '../../../config/routes';
import AuthService from '../../../security/services/AuthService';

const slideImages = [
	'iStockELS-845915488_with_screeen_and_domain.jpg',
	'iStockELS-1340561086_with_screen.jpg',
	'AdobeStockELS_352150617_with_screen.jpg'
];

const isLoggedIn = AuthService.isLoggedIn();

function HomePageSliderComponent({ t }) {
 
  const [current, setCurrent] = useState(0);
  const length = slideImages.length;
  const [mousedOver, setMousedOver] = useState(false);

  useEffect(() => {
    if (!mousedOver) {
      const timer = setInterval(() => {
        setCurrent((prevCount) => (prevCount + 1) % slideImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [mousedOver]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

	return (
      <div className="orbit landing" 
      onMouseOver={() => setMousedOver(true)}
      onMouseOut={() => setMousedOver(false)}
      >  
        <div className="orbit-wrapper">
          <div className="orbit-controls">
              <button className="orbit-previous" onClick={prevSlide}>
                <span className="entypo entypo-left-open-big"></span>
              </button>
              <button className="orbit-next" onClick={nextSlide}>
                <span className="entypo entypo-right-open-big"></span>
              </button>
          </div>
          <div className='carousel'>
            <div className="carousel-inner" style={ { transform: `translateX(${-current * 100}%)`} }>
              {slideImages.map((slideImage, index)=>  (
                  <div className="carousel-item" key={index}>
                    <li className="orbit-slide" style={{'backgroundImage': `url(${window.location.origin}/files/images/landingpage/${slideImage})`}}/>
                  </div>
              ))} 
            </div>
          </div>
        </div>
        <div className="text">
          <div className="grid-container">
            <div className="grid-x grid-margin-x">
              <div className="cell medium-8">
                <div className="box">
                  <div className="padding text-center">
                    <h2> {t('slider_card_title')} </h2>
                    <p> {t('slider_card_body')} </p>
                    <p>
                      <a className="button" href={config.API_Config.shop_url} target="_blank" rel="noreferrer">{t('buy_now')}</a>
                      { !isLoggedIn &&
                        <a className="button" href={routes.securities_pages.login.path}>{t('register')}</a>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <nav className="orbit-bullets">
              {slideImages.map((slideImage, index) =>
                 (<button className={(current === index ? ' is-active' : '')} key={index} onClick={()=>setCurrent(index)}></button>)
              )}
          </nav>
        </div>
    </div>
	);
}

export default HomePageSliderComponent;
