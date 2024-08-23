import { useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { vegetables, plants, appleShop } from '../../db/vegetable';
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
import pearImg from './../../img/mainPage/pear.png'
import radishImg from './../../img/mainPage/radish.png'
import saladImg from './../../img/mainPage/salad.png'
import spinachImg from './../../img/mainPage/spinach.png'
import { Field } from '../../interfaces/Field';
import { setAppleScoreCallback, setFieldsCallback, setScoreCallback } from '../../db/cloudStorageFunctions';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import arrowLeft from './../../img/mainPage/arrowLeft.png'
import arrowRight from './../../img/mainPage/arrowRight.png'
import carrotGif from './../../gif/carrot.gif'
import saladGif from './../../gif/salad.gif'
import radishGif from './../../gif/radish.gif'
import pepperGif from './../../gif/pepper.gif'
import tomatoGif from './../../gif/tomato.gif'
import asparagusGif from './../../gif/asparagus.gif'
import courgetteGif from './../../gif/courgette.gif'
import spinachGif from './../../gif/spinach.gif'
import tonIcon from './../../img/invitePage/ton.png'
import { handleTransaction } from '../../db/transactions';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { tonPerK, tonPerMinute } from '../../db/tonCosts';


const vegetableImages: { [key: string]: string } = {
  Tomato: tomatoImg,
  Apple: appleImg,
  Asparagus: asparagusImg,
  Carrot: carrotImg,
  Cherry: cherryImg,
  Courgette: courgetteImg,
  Pepper: pepperImg,
  Pear: pearImg,
  Radish: radishImg,
  Lettuce: saladImg,
  Spinach: spinachImg,
};

const vegetableGifs: { [key: string]: string } = {
  Tomato: tomatoGif,
  Apple: appleImg,
  Asparagus: asparagusGif,
  Carrot: carrotGif,
  Cherry: cherryImg,
  Courgette: courgetteGif,
  Pepper: pepperGif,
  Pear: pearImg,
  Radish: radishGif,
  Lettuce: saladGif,
  Spinach: spinachGif,
};

interface MainTabProps {
  score: number;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  activeField: number;
  setActiveField: (field: number) => void;
  cs: CloudStorage | null; 
}

const MainTab: React.FC<MainTabProps> = ({ score, setCurrentPage, fields, setFields, setScore, appleScore, setAppleScore, activeField, setActiveField, cs }) => {
  const [mainPopupOpened, setMainPopupOpened] = useState<boolean>(false);
  const [passPopupOpened, setPassPopupOpened] = useState<boolean>(false);
  const [selectedCallback, setSelectedCallback] = useState<() => void>(() => {});
  const [selectedField, setSelectedField] = useState<Field>({
    vegetable: "",
    plantedAt: new Date(), // This initializes plantedAt with the current date and time
    duration: 0
  })

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
          <div className='main-items-collection'>
            <button onClick={() => {alert('clicked')}}>
              <img src={arrowLeft} alt="arrow" className='collection-pass-icons'/>
            </button>
          </div>
          <div className='main-pass'>
            <button onClick={() => {setPassPopupOpened(true)}}>
              <img src={arrowLeft} alt="arrow" className='collection-pass-icons'/>
            </button>
          </div>
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
                  {activeField === index && <FieldElement setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} index={index} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs} setSelectedField={setSelectedField} setSelectedCallback={setSelectedCallback} setMainPopupOpened={setMainPopupOpened} />}
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
        {mainPopupOpened && <MainPopUp item={selectedField} handleRemoveClick={selectedCallback} setMainPopupOpened={setMainPopupOpened} />}
        {passPopupOpened && <PassPopUp  setPassPopupOpened={setPassPopupOpened} />}
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
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
  setSelectedField: (field: Field) => void;
  setSelectedCallback: (callback: () => void) => void;
  setMainPopupOpened: (opened: boolean) => void;
}

const FieldElement: React.FC<FieldItemProps> = ({setCurrentPage, fields, setFields, index, score, setScore, appleScore, setAppleScore, cs, setSelectedField, setSelectedCallback, setMainPopupOpened}) => {
  const initialTime = Math.max(0, fields[index].duration - Math.floor((Date.now() - new Date(fields[index].plantedAt).getTime()) / 1000));
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleRemoveClick = () => {
    const newField: Field = {
      vegetable: "",
      plantedAt: new Date(), // This initializes plantedAt with the current date and time
      duration: 0
    };

    const updatedFields = [...fields];
    updatedFields[index] = newField
    setFields(updatedFields)

    setTimeRemaining(Math.max(0, newField.duration - Math.floor((Date.now() - new Date(newField.plantedAt).getTime()) / 1000)))

    setFieldsCallback(cs, updatedFields)
    setMainPopupOpened(false)
  }
  
  const handlePlantClick = () => {
    setCurrentPage(1); //Navigate to Shop page
  };

  const handleClaimClick = () => {
    if(plants.some(plant => plant.name === fields[index].vegetable)){
      //This plant has not to be removed from the field
      if(fields[index].vegetable === 'Apple'){
        //Increase apple score by 1
        const newAppleScore = appleScore + 1
        setAppleScore(newAppleScore)
        setAppleScoreCallback(cs, newAppleScore)
      }
      const newField: Field = {
        vegetable: fields[index].vegetable,
        plantedAt: new Date(), // This initializes plantedAt with the current date and time
        duration: fields[index].duration
      };
  
      const updatedFields = [...fields];
      updatedFields[index] = newField
      setFields(updatedFields)

      setTimeRemaining(Math.max(0, newField.duration - Math.floor((Date.now() - new Date(newField.plantedAt).getTime()) / 1000)))
  
      const plantedVegetable = plants.find(plant => plant.name === fields[index].vegetable);
      const newScore = score + plantedVegetable!!.reward
      setScore(newScore)



      setFieldsCallback(cs, updatedFields)
      setScoreCallback(cs, newScore)
    }else{
      //This vegetable has to be removed
      const newField: Field = {
        vegetable: "",
        plantedAt: new Date(), // This initializes plantedAt with the current date and time
        duration: 0
      };
  
      const updatedFields = [...fields];
      updatedFields[index] = newField
      setFields(updatedFields)
      
      const plantedVegetable = vegetables.find(plant => plant.name === fields[index].vegetable);
      const newScore = score + plantedVegetable!!.reward
    
      setScore(newScore)

      setFieldsCallback(cs, updatedFields)
      setScoreCallback(cs, newScore)
    }
  };

  const handleClaimTonClick = () => {
    const totalMinutes : number = Math.floor(timeRemaining / 60);
    var tonPrice : number = totalMinutes*tonPerMinute

    if (tonPrice === 0) {
      tonPrice = tonPerMinute;
    }

    handleTransaction(tonConnectUI, Math.floor(tonPrice*1000000000).toString(), handleClaimClick)
  }

  const handleUnlockTonClick = () => {
    const numberOfK : number = (2500*(2 ** index))/1000
    var tonPrice : number = numberOfK*tonPerK

    if (tonPrice === 0) {
      tonPrice = tonPerK;
    }

    handleTransaction(tonConnectUI, Math.floor(tonPrice*1000000000).toString(), handleUnlockClickNoScoreChange)
  }

  const handleUnlockClickNoScoreChange = () => {
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
    setMainPopupOpened(false)  
  }

  return(
    <div className="countdown-container">
      {fields[index].vegetable !== "locked" && <div className="main-countdown">
        <img src={hourglassImg} alt="hourglass" />
        <span className="main-time"><CountdownTimer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining}/></span>
      </div>}
      {fields[index].vegetable === "locked" && <div className="main-countdown">
        <img src={moneyImg} alt="money" />
        <span className="main-time"><UnlockedField index={index}/></span>
      </div>}
      <div className="main-field-icon">
        {(fields[index].vegetable == "") && <img src={emptyField} alt="empty field" />}
        {(fields[index].vegetable == "locked") && <img src={lockedField} alt="locked field" />}
        {fields[index].vegetable != "" && fields[index].vegetable != "locked" && timeRemaining > 0 && <img src={vegetableImages[fields[index].vegetable]} alt="vegetable"/>}
        {fields[index].vegetable != "" && fields[index].vegetable != "locked" && timeRemaining === 0 && <img src={vegetableGifs[fields[index].vegetable]} alt="gif" onClick={handleClaimClick}/>}
      </div>
      <div className='main-buttons'>
        {fields[index].vegetable == "" && <button className='main-plant-button' onClick={handlePlantClick}>Plant</button>}
        {(timeRemaining > 0 && fields[index].vegetable != "" && fields[index].vegetable != "locked") && !containsPlantName(fields[index].vegetable) && tonConnectUI.connected && <button className='main-plant-button-ton' onClick={handleClaimTonClick} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Claim</button>}
        {(timeRemaining > 0 && fields[index].vegetable != "" && fields[index].vegetable != "locked") && !containsPlantName(fields[index].vegetable) && !tonConnectUI.connected && <button className='main-plant-button-disabled' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} disabled><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Claim</button>}
        {(timeRemaining == 0 && fields[index].vegetable != "" && fields[index].vegetable != "locked") && <button className='main-plant-button' onClick={handleClaimClick}>Claim</button>}
        {(fields[index].vegetable == "locked" && score >= (2500*(2 ** index))) && <button className='main-plant-button' onClick={() => {setSelectedCallback(() => handleUnlockClick); setSelectedField(fields[index]); setMainPopupOpened(true)}}>Unlock</button>}
        {(fields[index].vegetable == "locked" && score < (2500*(2 ** index))) && tonConnectUI.connected && <button className='main-plant-button-ton' onClick={handleUnlockTonClick} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Unlock</button>}
        {(fields[index].vegetable == "locked" && score < (2500*(2 ** index))) && !tonConnectUI.connected && <button className='main-plant-button-disabled'  disabled style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Unlock</button>}
        {containsPlantName(fields[index].vegetable) && timeRemaining > 0 &&  <><button className='main-remove-button' onClick={() => {setSelectedCallback(() => handleRemoveClick); setSelectedField(fields[index]); setMainPopupOpened(true)}}>Remove</button>
                                                                              {tonConnectUI.connected && <button className='main-plant-button-ton' onClick={handleClaimTonClick} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Claim</button>}
                                                                              {!tonConnectUI.connected && <button className='main-plant-button-disabled'  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} disabled><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Claim</button>}</>}
      </div> 
    </div>
  );
}

interface MainPopUpProps {
  setMainPopupOpened: (opened: boolean) => void;
  item: Field;
  handleRemoveClick : () => void;
}

const MainPopUp: React.FC<MainPopUpProps> = ({ setMainPopupOpened, item, handleRemoveClick }) => {
  const handleOverlayClick = () => {
    setMainPopupOpened(false)
  };

  const handleCancelClick = () => {
    setMainPopupOpened(false)
  }

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  };

  return (
    <>
      <div className="main-modal-overlay" onClick={handleOverlayClick} >
        <div  className="main-modal-box" onClick={handlePopUpClick}>
          <button className="main-popup-close-button" onClick={handleCancelClick}><CloseRoundedIcon style={{height: '25px', width: '25px', borderRadius: '50%', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/></button>
          {item.vegetable !== 'locked' && <div className='main-popup-content'>
            <div className='main-popup-title'>Warning</div>
            <div className='shop-reward-text'>
              <p>This action is not reversible, you will definetively remove the {item.vegetable} plant. Do you confirm the action?</p>
            </div>
            <div className='main-popup-buttons'>
              <button className='main-popup-remove-button' onClick={handleRemoveClick}>Remove</button>
              <button className='main-popup-plant-button' onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>}  
          {item.vegetable === 'locked' && <div className='main-popup-content'>
            <div className='main-popup-title'>Confirm</div>
            <div className='shop-reward-text'>
              <p>Are you sure to purchase this item? The action cannot be undone.</p>
            </div>
            <div className='main-popup-buttons'>
              <button className='main-popup-plant-button' onClick={handleRemoveClick}>Confirm</button>
              <button className='main-popup-remove-button' onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>}         
        </div>
      </div>
    </>
  );
}

interface PassPopUpProps {
  setPassPopupOpened: (opened: boolean) => void;
}

const PassPopUp: React.FC<PassPopUpProps> = ({ setPassPopupOpened }) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleOverlayClick = () => {
    setPassPopupOpened(false)
  };

  const handleCancelClick = () => {
    setPassPopupOpened(false)
  }

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  };

  return (
    <>
      <div className="pass-modal-overlay" onClick={handleOverlayClick} >
        <div  className="pass-modal-box" onClick={handlePopUpClick}>
          <button className="pass-popup-close-button" onClick={handleCancelClick}><CloseRoundedIcon style={{height: '25px', width: '25px', borderRadius: '50%', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/></button>
          
          <div className='pass-popup-content'>
            <img className='main-balance-icon' src={appleImg} alt={"apple"} style={{height: '100px', width: '80px'}} />
            <div className='pass-popup-title'>Plant Pass</div>
            <div className='shop-reward-text'>
              <p>-Get exclusive season item</p>
              <p>-Claim plant rewards 2x faster</p>
              <p>-Unlock a new pot for free</p>
            </div>
            <div className='pass-popup-buttons'>
              {tonConnectUI.connected && <button className='main-plant-button-ton' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Get pass</button>}
              {!tonConnectUI.connected && <button className='main-plant-button-disabled' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} disabled><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Get pass</button>}
            </div>
          </div>       
        </div>
      </div>
    </>
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
  }, [timeRemaining]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
    </div>
  );
};

interface  UnlockedFieldProps{
  index: number;
}

const UnlockedField : React.FC<UnlockedFieldProps> = ({ index }) => {

  return (
    <div>
      <p>{2500*(2 ** index)}</p>
    </div>
  );
};

function containsPlantName(name: string): boolean {
  return plants.some(plant => plant.name === name);
}

export default MainTab;