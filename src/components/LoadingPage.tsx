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
          {/*<h1 className="Loading-title">CRYSTAL CARROT SEASON</h1>*/}
          <p className='Loading-tip'>{tips[tipIndex]}</p>
          <progress style={{position: 'absolute', bottom: '5px', width: '90%'}} color='#e3bf0b'/>
        </div>
    );
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default LoadingPage;