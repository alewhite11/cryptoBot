import React from 'react';
import { Carousel } from 'antd';

interface TutorialProps {
  setRegistered : (value: number) => void;
}
const InitialTutorial : React.FC<TutorialProps> = ({ setRegistered }) => {
  
  return (
    <div className="Tutorial-component">
      <div className='Tutorial-slider'>
        <Carousel arrows infinite={false}>
          <div className='slide'>
            <h3>Slide 1</h3>
          </div>
          <div className='slide'>
            <h3>Slide 2</h3>
          </div>
          <div className='slide'>
            <h3>Slide 3</h3>
          </div>
          <div className='slide'>
            <h3>Slide 4</h3>
            <button onClick={() => {setRegistered(2)}}>Start</button>
          </div>
        </Carousel>
      </div>  
    </div>
  );
}

export default InitialTutorial;