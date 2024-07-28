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
            <div className="carousel-item" key={0}>
              <p style={{color: 'white', textAlign: 'left', fontSize: '7vw', fontWeight: 'bold', paddingTop: '30px', paddingLeft: '20px'}}>Welcome to PLANT, a community-driven project</p>
              <div className='carousel-back-item-part'>
                <div className='carousel-back-item-text'>
                  <p>Choose your plant in the shop and claim when ready</p>
                </div>
                <img className="carousel-back-item-image" src={t1} alt={`Slide`} />
              </div>
            </div>
            <div className="carousel-item" key={1}>
              <p style={{color: 'white', textAlign: 'left', fontSize: '7vw', fontWeight: 'bold', paddingTop: '30px', paddingLeft: '20px'}}>Earn coins to expand your land and purchase more profitable plants</p>
              <img style={{alignSelf: 'end', width: '50%', padding: '10px'}} src={t2} alt={`Slide`} />
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <p style={{flex: '20%', textAlign: 'right', color: 'black', fontWeight: 'bold', fontSize: '4vw'}}>TIP:</p>
                <p style={{flex: '80%', paddingLeft: '10px',color: 'white', fontSize: '4vw'}}>Log in every day and use the TASK section: this will speed up your progress</p>
              </div>    
            </div>
            <div className="carousel-item" key={2}>
              <p style={{color: 'white', textAlign: 'left', fontSize: '7vw', fontWeight: 'bold', paddingTop: '30px', paddingLeft: '20px'}}>The more you plant, the more apples you get</p>
              <img style={{alignSelf: 'start', width: '50%', padding: '10px'}} src={t3} alt={`Slide`} />
              <p style={{color: 'white', textAlign: 'left', fontSize: '4vw', fontWeight: 'bold', paddingLeft: '20px'}}>You can purchase tools with apples and earn $PLANT tokens passively</p>
            </div>
            <div className="carousel-item" key={3}>
              <p style={{color: 'white', textAlign: 'left', fontSize: '7vw', fontWeight: 'bold', paddingTop: '30px', paddingLeft: '20px'}}>PLANT wants to make an impact in the real world. Partecipate in surveys and guide the evolution of the project</p>
              <img style={{alignSelf: 'center', width: '30%', padding: '10px'}} src={t4} alt={`Slide`} />
              <p style={{color: 'white', textAlign: 'left', fontSize: '4vw', paddingLeft: '20px'}}>Don't forget to invite your friends! #BUIDL</p>
              <button className="last-slide-button" onClick={() => setRegistered(2)}>
                Start!
              </button>
            </div>
            {/*images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <img className="carousel-image" src={image} alt={`Slide ${index}`} />
                {index === images.length - 1 && (
                  <button className="last-slide-button" onClick={() => setRegistered(2)}>
                    Start!
                  </button>
                )}
              </div>
            ))*/}
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
