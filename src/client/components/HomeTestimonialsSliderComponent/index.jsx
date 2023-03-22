import React from 'react';

function HomeTestimonialsSliderComponent({ testimonial }) {
    const { text, author, image } = testimonial
	return (
                <div className="grid-container">
                    <div className="box">
                        <div className="padding">
                            <div className="grid-x">
                                <div className="cell medium-8">
                                    <p>{text}</p>
                                </div>
                                <div className="cell medium-4 text-center">
                                    <img src={`${window.location.origin}/files/images/landingpage/${image}`} alt={author}/>
                                    <p>{author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	);
}

export default HomeTestimonialsSliderComponent;
