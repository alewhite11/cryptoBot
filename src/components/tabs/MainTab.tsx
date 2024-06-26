import { useState, useEffect } from 'react';
import moneyImg from './../../img/shopItems/dollar.png'
import emptyField from './../../img/mainPage/emptyField.png'
import lockedField from './../../img/mainPage/lockedField.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import tomatoImg from './../../img/mainPage/tomato.png'
import appleImg from './../../img/mainPage/apple.png'
import asparagusImg from './../../img/mainPage/asparagus.png'
import carrotImg from './../../img/mainPage/carrot.png'
import cherryImg from './../../img/mainPage/cherry.png'
import courgetteImg from './../../img/mainPage/courgette.png'
import pepperImg from './../../img/mainPage/pepper.png'
import poireImg from './../../img/mainPage/poire.png'
import radishImg from './../../img/mainPage/radish.png'
import saladImg from './../../img/mainPage/salad.png'
import spinachImg from './../../img/mainPage/spinach.png'
import { Field } from '../../interfaces/Field';
import { plants } from '../../db/vegetable';
import { setFieldsCallback, setScoreCallback } from '../../db/cloudStorageFunctions';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import arrowLeft from './../../img/mainPage/arrowLeft.png'
import arrowRight from './../../img/mainPage/arrowRight.png'
import carrotGif from './../../gif/carrot.gif'

const vegetableImages: { [key: string]: string } = {
  Tomato: tomatoImg,
  Apple: appleImg,
  Asparagus: asparagusImg,
  Carrot: carrotImg,
  Cherry: cherryImg,
  Courgette: courgetteImg,
  Pepper: pepperImg,
  Poire: poireImg,
  Radish: radishImg,
  Lettuce: saladImg,
  Spinach: spinachImg,
};

interface MainTabProps {
  score: number;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  setScore: (score: number) => void;
  activeField: number;
  setActiveField: (field: number) => void;
  cs: CloudStorage | null; 
}

const MainTab: React.FC<MainTabProps> = ({ score, setCurrentPage, fields, setFields, setScore, activeField, setActiveField, cs }) => {

  const goToNextField = () => {
    const newIndex = activeField + 1;
    setActiveField(newIndex);
  };

  const goToPrevField = () => {
    const newIndex = activeField - 1;
    setActiveField(newIndex);
  };

  return (
    <div className="App">
      <header className="App-header-main">
        <div className='main-field'>
          <div className="slider">
            {activeField !== 0 && <button className="prev" onClick={goToPrevField}>
              <img src={arrowLeft} alt="arrow" style={{width: '40px', height: '40px'}}/>
            </button>}
            {activeField == 0 &&<button className="prev" style={{color: 'transparent'}}>
              <img src={arrowLeft} alt="arrow" style={{width: '40px', height: '40px', visibility: 'hidden'}}/>
            </button>}
            <div className="slider-items" style={{ transform: `translateX(-${activeField * 100}%)` }}>
              {fields.map((item, index) => (
                <div key={index} className="slider-item">
                  {activeField === index && <FieldElement setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} index={index} score={score} setScore={setScore} cs={cs}/>}
                </div>
              ))}
            </div>
            {activeField < fields.length - 1 &&<button className="next" onClick={goToNextField}>
              <img src={arrowRight} alt="arrow" style={{width: '40px', height: '40px'}}/>
            </button>}
            {activeField == fields.length - 1 &&<button className="next" style={{color: 'transparent'}}>
              <img src={arrowRight} alt="arrow" style={{width: '40px', height: '40px', visibility: 'hidden'}}/>
            </button>}
          </div>
        </div>
      </header>
    </div>
  );
};

interface FieldItemProps {
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  index: number;
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
}

const FieldElement: React.FC<FieldItemProps> = ({setCurrentPage, fields, setFields, index, score, setScore, cs}) => {
  const initialTime = Math.max(0, fields[index].duration - Math.floor((Date.now() - new Date(fields[index].plantedAt).getTime()) / 1000));
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  
  const handlePlantClick = () => {
    setCurrentPage(1); //Navigate to Shop page
  };

  const handleClaimClick = () => {
    const newField: Field = {
      vegetable: "",
      plantedAt: new Date(), // This initializes plantedAt with the current date and time
      duration: 0
    };

    const updatedFields = [...fields];
    updatedFields[index] = newField
    setFields(updatedFields)
    setFieldsCallback(cs, updatedFields)

    const plantedVegetable = plants.find(plant => plant.name === fields[index].vegetable);
    const newScore = score + plantedVegetable!!.reward
  
    setScore(newScore)
    setScoreCallback(cs, newScore)
  };

  const handleUnlockClick = () => {
    var newScore = score - (2500*(2 ** index))

    setScore(newScore)
    setScoreCallback(cs, newScore)

    const newField: Field = {
      vegetable: "",
      plantedAt: new Date(), 
      duration: 0
    };

    const newLockedField: Field = {
      vegetable: "locked",
      plantedAt: new Date(), 
      duration: 0
    };

    const updatedFields = [...fields];
    updatedFields[index] = newField
    updatedFields.push(newLockedField)    
    setFields(updatedFields)
    setFieldsCallback(cs, updatedFields)    
  }

  return(
    <div className="countdown-container">
      {fields[index].vegetable !== "locked" && <div className="main-countdown">
        <img src={hourglassImg} alt="hourglass" />
        <span className="main-time"><CountdownTimer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining}/></span>
      </div>}
      {fields[index].vegetable === "locked" && <div className="main-countdown">
        <img src={moneyImg} alt="hourglass" />
        <span className="main-time">{2500*(2 ** index)}</span>
      </div>}
      <div className="main-field-icon">
        {(fields[index].vegetable == "") && <img src={emptyField} alt="empty field" />}
        {(fields[index].vegetable == "locked") && <img src={lockedField} alt="locked field" />}
        {fields[index].vegetable != "" && fields[index].vegetable != "locked" && timeRemaining > 0 && <img src={vegetableImages[fields[index].vegetable]} alt="vegetable"/>}
        {fields[index].vegetable != "" && fields[index].vegetable != "locked" && timeRemaining === 0 && <img src={carrotGif} alt="gif"/>}
      </div>
      {fields[index].vegetable == "" && <button className='main-plant-button' onClick={handlePlantClick}>Plant</button>}
      {(timeRemaining > 0 && fields[index].vegetable != "" && fields[index].vegetable != "locked") && <button className='main-plant-button-disabled' disabled>Claim</button>}
      {(timeRemaining == 0 && fields[index].vegetable != "" && fields[index].vegetable != "locked") && <button className='main-plant-button' onClick={handleClaimClick}>Claim</button>}
      {(fields[index].vegetable == "locked" && score >= (2500*(2 ** index))) && <button className='main-plant-button' onClick={handleUnlockClick}>Unlock</button>}
      {(fields[index].vegetable == "locked" && score < (2500*(2 ** index))) && <button className='main-plant-button-disabled' disabled>Unlock</button>}
    </div>

  );
}

interface TimerProps {
  timeRemaining: number;
  setTimeRemaining: (time: number | ((prevTime: number) => number)) => void;
}

const CountdownTimer: React.FC<TimerProps> = ({ timeRemaining, setTimeRemaining }) => {
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime: number) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          console.log('Countdown complete!');
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [setTimeRemaining]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
    </div>
  );
};

export default MainTab;