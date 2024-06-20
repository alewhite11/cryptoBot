import { useState} from 'react';
import { WebAppUser } from '../../interfaces/telegramInterfaces';
import moneyImg from './../../img/shopItems/dollar.png'
import addImg from './../../img/mainPage/add.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const fields : number[] = [0,1,2,3];

interface MainTabProps {
  user: WebAppUser | null;
  score: number;
  handleClick: () => void;
  setCurrentPage: (page: number) => void;
}

const MainTab: React.FC<MainTabProps> = ({ user, score, handleClick, setCurrentPage }) => {

  const [activeField, setActiveField] = useState(0)  //for the slider

  const goToNextField = () => {
    const newIndex = activeField + 1;
    setActiveField(newIndex);
  };

  const goToPrevField = () => {
    const newIndex = activeField - 1;
    setActiveField(newIndex);
  };

  const handleImageClick = () => {
    setCurrentPage(2); //Navigate to Task page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PLANT</h1>
        <div className='main-balance'>
          <img className='main-balance-icon' src={moneyImg} alt={"coin"} />
          <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
        </div>
        <div className='main-coins'>
          <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}>{score}</span>
          <img className='main-add-icon' onClick={handleImageClick} src={addImg} alt={"add"} />
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
                  {activeField === item && <FieldElement />}
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

}

const FieldElement: React.FC<FieldItemProps> = () => {
  return(
    <>
      <p style={{color: 'black'}}>Field</p>
    </>
  );
}

export default MainTab;