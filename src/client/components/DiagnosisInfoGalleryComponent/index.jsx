import React, { useState } from 'react';
import { useEffect } from 'react';
import OnKeyPressComponent from '../KeyPressComponent';
import PanAndZoomImage from '../PanAndZoomImage/PanAndZoomImage';
function DiagnosisInfoGalleryComponent(props) {
	const { handleShowGallery, showGallery, images } = props;
	const [ current, setCurrent ] = useState(images.indexOf(showGallery.image));
	const [ imageSize, setImageSize ] = useState({width: 0, height: '80%'});
	const [ position, setPosition ] = useState({x: 0, y: 0});
	const [ zoomIn, setZoomIn ] = useState(false)
	const [ nextDisabled, setNextDisabled ] = useState(false)
	const [ prevDisabled, setPrevDisabled ] = useState(false)
	const bodyWidth = document.body.clientWidth;
	const bodyHeight = document.body.clientHeight;
    const length = images.length;

	const nextSlide = () => {
		if (!nextDisabled){
		   setCurrent(current === length - 1 ? 0 : current + 1)
		}
	};

	const prevSlide = () => {
		if (!prevDisabled){
		   setCurrent(current === 0 ? length - 1 : current - 1);
		}
	};

	const zoomInImage = (e) => {
		setPosition({x: e.clientX, y: e.clientY})
		if (!zoomIn) { 
			setZoomIn(true)
		}
	}
	
	useEffect(() => {
		setZoomIn(false);
		setNextDisabled((current === length - 1) ? true : false);
		setPrevDisabled((current === 0) ? true : false);
	}, [current, length]);

	const onFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			document.getElementById('fancybox-container-1')?.requestFullscreen()
		}
	}
	useEffect(() => {
		if (!zoomIn) {setImageSize({width: document.getElementById('wrap').clientWidth})}
	 },[bodyWidth,bodyHeight, zoomIn]);
	 
	return (
		<OnKeyPressComponent next={nextSlide} previous={prevSlide}>
			<div
				className="fancybox-container fancybox-is-open fancybox-is-zoomable fancybox-can-zoomIn"
				id="fancybox-container-1"
			>
				<div className="fancybox-bg"></div>
				<div className="fancybox-inner" >
					<div className="fancybox-toolbar">
						<button className="fancybox-button fancybox-button--fullscreen" onClick={onFullScreen} title="Full screen"></button>
						<button
							className="fancybox-button fancybox-button--close"
							title="Close"
							onClick={handleShowGallery}
						></button>
					</div>
					{ length && length > 1 &&
						<div className="fancybox-navigation"
						>
							<button title="Previous" className="fancybox-arrow fancybox-arrow--left" onClick={prevSlide} disabled={prevDisabled} />
							<button title="Next" className="fancybox-arrow fancybox-arrow--right" onClick={nextSlide} disabled={nextDisabled}/>
						</div>
					}
					<div className="fancybox-stage">
						<div className="fancybox-slide fancybox-slide--image fancybox-slide--current fancybox-slide--complete">
						{current > -1 && !zoomIn &&
							<div
							    id="wrap"
								className="fancybox-image-wrap"
								onClick={zoomInImage}
								style={{ width: 'auto', 
										 height: `80%`, 
									     transition:'0.1s',
										 aspectRatio: '1.42/1',
										 transform: `translate(${Math.round((bodyWidth-imageSize.width)/2)}px,${(100- 80)/2}vh)`, 
										 display: 'flex', 
										 justifyContent: 'center', 
										 alignItems: 'center',
										 cursor : 'zoom-in'
										}}
							>
								   <img className="fancybox-image" src={`${window.location.origin}/${images[current]}`} alt="" />
							</div>}
							{zoomIn && <PanAndZoomImage src={`${window.location.origin}/${images[current]}`} position={position}></PanAndZoomImage>}
						</div>
					</div>
				</div>
			</div>
		</OnKeyPressComponent>
	);
}

export default DiagnosisInfoGalleryComponent;
