import React, { useEffect, useRef } from 'react';
import { progressRing } from '../../../shared/helpers/properties';

import DiagnosisInfoGalleryComponent from '../DiagnosisInfoGalleryComponent';
import useDiagnosisInfo from './useDiagnosisInfo';

function DiagnosisInfoComponent(props) {
	const { info, setShowInfo } = props;
	const images = info?.images.split(',');
	const ref = useRef(null);
	const { handleShowGallery, showGallery, handleClick } = useDiagnosisInfo();
	useEffect(() => {
		ref.current.addEventListener('click', handleClick);
	}, []);
	let percent = Math.round((info.duration_in_min / 60) * 100) || 0;
	const { strokeDasharray, strokeDashoffset } = progressRing(percent, 10);
	return (
		<>
			<div className="reveal-overlay" style={{ display: 'block' }}>
				<dialog open className="show-popup-info" id="modal-test">
					<h3>{info && info.title}</h3>
					<div className="grid-x grid-padding-x grid-padding-y">
						<div className="cell small-4">
							<aside>
								<div className="duration">
									<span className="progress-ring">
										<svg>
											<circle
												r="10"
												cx="20"
												cy="20"
												strokeDasharray={strokeDasharray}
												strokeDashoffset={strokeDashoffset}
											/>
										</svg>
									</span>
									<span className="text">
										<span className="label">Dauer ca.</span>
										<span className="time">{info && info.duration_in_min} Minuten</span>
									</span>
								</div>

								<div className="short-info" dangerouslySetInnerHTML={{ __html: info.aside_text }}></div>
							</aside>
						</div>
						<div className="cell small-8">
							<ul className="images clearfix">
								{info && images &&
									images.map((image, index) => {
										return (
											<li key={index}>
												<a
													onClick={() => handleShowGallery(image)}
													className="fancybox"
													data-fancybox="gallery"
													style={{
														backgroundImage: `url(${window.location.origin}/${image})`
													}}
												></a>
											</li>
										);
									})}
							</ul>
							<div
								ref={ref}
								className="description"
								dangerouslySetInnerHTML={{ __html: info.description }}
							></div>
						</div>
					</div>
					<button
						className="close-button"
						onClick={() => {
							setShowInfo({
								show: false,
								selectedItem: ''
							});
						}}
						aria-label="Popup schließen"
						type="button"
					>
						<span className="entypo-cancel-squared"></span>
					</button>
				</dialog>
			</div>
			{showGallery.show && (
				<DiagnosisInfoGalleryComponent showGallery={showGallery} handleShowGallery={handleShowGallery} images={images}/>
			)}
		</>
	);
}

export default DiagnosisInfoComponent;
