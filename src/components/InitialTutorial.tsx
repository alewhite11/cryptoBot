import React, { useState } from 'react';
import '../App.css';
import t1 from './../img/tutorial/tutorial1.jpg';
import t2 from './../img/tutorial/tutorial2.jpg';
import t3 from './../img/tutorial/tutorial3.jpg';
import t4 from './../img/tutorial/tutorial4.jpg';

const images = [t1, t2, t3, t4];

interface TutorialProps {
  setRegistered: (value: number) => void;
}

const InitialTutorial: React.FC<TutorialProps> = ({ setRegistered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? images.length - 1 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="center-container">
      <div className="carousel-outer-container">
        <div className="carousel-container">
          <div
            className="carousel-wrapper"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <img className="carousel-image" src={image} alt={`Slide ${index}`} />
                {index === images.length - 1 && (
                  <button className="last-slide-button" onClick={() => setRegistered(2)}>
                    Start!
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Conditionally render Previous button */}
          {currentIndex > 0 && (
            <button className="carousel-button carousel-prev-button" onClick={prevSlide}>
              ‹
            </button>
          )}
          {/* Conditionally render Next button */}
          {currentIndex < images.length - 1 && (
            <button className="carousel-button carousel-next-button" onClick={nextSlide}>
              ›
            </button>
          )}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialTutorial;
