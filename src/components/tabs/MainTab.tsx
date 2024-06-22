import { useState} from 'react';
import moneyImg from './../../img/shopItems/dollar.png'
import addImg from './../../img/mainPage/add.png'
import emptyField from './../../img/mainPage/emptyField.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const fields : number[] = [0,1,2,3];

interface MainTabProps {
  score: number;
  setCurrentPage: (page: number) => void;
}

const MainTab: React.FC<MainTabProps> = ({ score, setCurrentPage }) => {

  const [activeField, setActiveField] = useState(0)  //for the slider

  const goToNextField = () => {
    const newIndex = activeField + 1;
    setActiveField(newIndex);
  };

  const goToPrevField = () => {
    const newIndex = activeField - 1;
    setActiveField(newIndex);
  };

  const handleAddClick = () => {
    setCurrentPage(2); //Navigate to Task page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='main-title'>PLANT</h1>
        <div className='main-balance'>
          <img className='main-balance-icon' src={moneyImg} alt={"coin"} />
          <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
        </div>
        <div className='main-coins'>
          <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}>{score}</span>
          <img className='main-add-icon' onClick={handleAddClick} src={addImg} alt={"add"} />
        </div>
        <div className='main-field'>
          <div className="slider">
            {activeField !== 0 && <button className="prev" onClick={goToPrevField}>
              <ArrowBackIosNewIcon />
            </button>}
            {activeField == 0 &&<button className="prev" style={{color: '#f0f0f0'}}>
              <ArrowBackIosNewIcon />
            </button>}
            <div className="slider-items" style={{ transform: `translateX(-${activeField * 100}%)` }}>
              {fields.map((item, index) => (
                <div key={index} className="slider-item">
                  {activeField === item && <FieldElement setCurrentPage={setCurrentPage}/>}
                </div>
              ))}
            </div>
            {activeField < fields.length - 1 &&<button className="next" onClick={goToNextField}>
              <ArrowForwardIosIcon />
            </button>}
            {activeField == fields.length - 1 &&<button className="next" style={{color: '#f0f0f0'}}>
              <ArrowForwardIosIcon />
            </button>}
          </div>
        </div>
      </header>
    </div>
  );
};

interface FieldItemProps {
  setCurrentPage: (page: number) => void;
}

const FieldElement: React.FC<FieldItemProps> = ({setCurrentPage}) => {
  const handlePlantClick = () => {
    setCurrentPage(1); //Navigate to Shop page
  };

  return(
    <div className="countdown-container">
      <div className="main-countdown">
        <img src={hourglassImg} alt="hourglass" />
        <span className="main-time">27 min</span>
      </div>
      <div className="main-field-icon">
        <img src={emptyField} alt="empty field" />
      </div>
      <button className='main-plant-button' onClick={handlePlantClick}>Plant</button>
    </div>

  );
}

export default MainTab;