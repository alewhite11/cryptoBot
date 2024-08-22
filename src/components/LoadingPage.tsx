import { ClockLoader } from 'react-spinners'
import './../App.css'
import { tips } from '../db/tips';
import { useEffect, useState } from 'react';

const LoadingPage = () => {
    const [tipIndex, setTipIndex] = useState(0)

    useEffect(() => {
      var x = getRandomNumber(0, tips.length - 1)
      setTipIndex(x)
    }, []);

    return(
        <div className="Loading-component">
          <h1 className="Loading-title">PLANT</h1>
          <div className="Loading-content">
            <p>Plant tokens, embrace nature</p>
            <ClockLoader 
              loading
              size={60}
              color="white"
            />
          </div>
          <p className='Loading-tip'>{tips[tipIndex]}</p>
        </div>
    );
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default LoadingPage;