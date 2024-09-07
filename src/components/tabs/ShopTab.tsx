import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import moneyImg from './../../img/shopItems/dollar.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import './../../App.css';
import EastIcon from '@mui/icons-material/East';
import { Plant } from '../../interfaces/Plant';
import { Field } from '../../interfaces/Field';
import { setAppleScoreCallback, setFieldsCallback, setPlantedVegetablesCallback, setScoreCallback } from '../../db/cloudStorageFunctions';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { vegetables, plants, appleShop, coinShop } from '../../db/vegetable';
import LockIcon from '@mui/icons-material/Lock';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { handleTransaction } from '../../db/transactions';
import { AppleItem } from '../../interfaces/AppleItem';
import tonIcon from './../../img/invitePage/ton.png'
import { tonPerK } from '../../db/tonCosts';
import { CoinItem } from '../../interfaces/CoinItem';

interface ShopTabProps {
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  cs: CloudStorage | null;
  activeField: number;
  setActiveField: (field: number) => void;
  plantedVegetables: Map<string, number>;
  setPlantedVegetables: (plantedVegetable: Map<string, number>) => void;
  activeTab: number;
  setActiveTab: (val: number) => void;
  addClicked: boolean;
  setAddClicked: (val: boolean) => void;
  passStatus: boolean;

}

const ShopTab: React.FC<ShopTabProps> = ({ passStatus, activeTab, setActiveTab, addClicked, setAddClicked, score, setScore, appleScore, setAppleScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
  useEffect(() => {
    if(addClicked){
      setAddClicked(false)
    }else{
      setActiveTab(0)
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div> 
        {/*<h1 className='title'>Shop:</h1>*/}
        <div className='bacheca'>
          <div className="tab-buttons">
            <button className={activeTab === 0 ? "active-tab" : ""} onClick={() => setActiveTab(0)}>Vegetables</button>
            <button className={activeTab === 1 ? "active-tab" : ""} onClick={() => setActiveTab(1)}>Trees</button>
            <button className={activeTab === 2 ? "active-tab" : ""} onClick={() => setActiveTab(2)}>A & C</button>
          </div>
          <div className="shop-items">
            {activeTab === 0 && (
              <>
                {vegetables.map((item, index) => (
                  <PlantItem passStatus={passStatus} item={item} key={index}index={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
                ))}
              </>
            )}
            {activeTab === 1 && (
              <>
                {plants.map((item, index) => (
                  <PlantItemTree passStatus={passStatus} item={item} key={index} index={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
                ))}
              </>
            )}
            {activeTab === 2 && (
              <>
                {appleShop.map((item, index) => (
                  <AppleShopItem item={item} key={index} index={index} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs}/>
                ))}
                {coinShop.map((item, index) => (
                  <CoinShopItem item={item} key={index} index={index} score={score} setScore={setScore} cs={cs}/>
                ))}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

//Planted vegetables
interface PlantItemProps {
  item: Plant;
  key: number;
  index: number;
  score: number;
  setScore: (score: number) => void;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  cs: CloudStorage | null;
  activeField: number;
  setActiveField: (field: number) => void;
  plantedVegetables: Map<string, number>;
  setPlantedVegetables: (plantedVegetable: Map<string, number>) => void;
  passStatus: boolean;
}

const PlantItem: React.FC<PlantItemProps> = ({ passStatus, item, key, index, score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
  const [shopPopupOpened, setShopPopupOpened] = useState<boolean>(false)
  const [errorPlanting, setErrorPlanting] = useState(false)

  const handlePlantClick = () => {
    const newField : Field = {vegetable: item.name, plantedAt: new Date(), duration: item.duration}
    const updatedFields = [...fields];

    // Replace or modify the element at the specified index (key)
    var changed = -1
    updatedFields.forEach((field, index) => {
      if(field.vegetable === "" && changed === -1){
        updatedFields[index] = newField;
        changed = index
      }
    });

    if(changed != -1){
      setFields(updatedFields)
      setFieldsCallback(cs, updatedFields)
      var newScore = score - item.cost;
      setScore(newScore)
      setScoreCallback(cs, newScore)
      var times = plantedVegetables.get(item.name)
      var newPlantedVegetables = plantedVegetables
      if(times !== undefined){
        times = times + 1
        newPlantedVegetables.set(item.name, times)
      }else{
        times = 1
        newPlantedVegetables.set(item.name, times)
      }
      setPlantedVegetables(newPlantedVegetables)
      setPlantedVegetablesCallback(cs, newPlantedVegetables)
      setCurrentPage(0) //move to fields
      setActiveField(changed)
    }else{
      setErrorPlanting(true)
    }
  };

  const handlePlantTonClick = () => {
    const newField : Field = {vegetable: item.name, plantedAt: new Date(), duration: item.duration}
    const updatedFields = [...fields];

    // Replace or modify the element at the specified index (key)
    var changed = -1
    updatedFields.forEach((field, index) => {
      if(field.vegetable === "" && changed === -1){
        updatedFields[index] = newField;
        changed = index
      }
    });

    if(changed != -1){
      setFields(updatedFields)
      setFieldsCallback(cs, updatedFields)
      var newScore = score - item.cost;
      setScore(newScore)
      setScoreCallback(cs, newScore)
      var times = plantedVegetables.get(item.name)
      var newPlantedVegetables = plantedVegetables
      if(times !== undefined){
        times = times + 1
        newPlantedVegetables.set(item.name, times)
      }else{
        times = 1
        newPlantedVegetables.set(item.name, times)
      }
      setPlantedVegetables(newPlantedVegetables)
      setPlantedVegetablesCallback(cs, newPlantedVegetables)
      setCurrentPage(0) //move to fields
      setActiveField(changed)
    }else{
      setErrorPlanting(true)
      var newScore = score + item.cost;
      setScore(newScore)
      setScoreCallback(cs, newScore)
    }
  };

  return (
    <>
    <div className="shop-item">
      {(!isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name) && index !== 0) && (
        <div className="shop-overlay">
          <LockIcon />
          <span>Plant {3 - ((index > 0 ? plantedVegetables.get(vegetables[index - 1].name) : 0) || 0)} more times {index > 0 ? vegetables[index - 1].name : item.name} to unlock</span>
        </div>
      )}
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
          <div style={{ display: 'flex', flex: '60%', alignContent: 'center' }}>
            <div className="item-intext-image">
              <img src={hourglassImg} alt={item.name} />
            </div>
            {!passStatus && <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}>{item.time}</span>}
            {passStatus && <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}><del style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>{item.time}</del></span>}
          </div>
        </div>
        <div className="item-pricing">
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          {item.cost < 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost}</span>}
          {item.cost >= 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost/1000}k</span>}
          <EastIcon style={{ color: 'black', marginRight: '10px'}}/>
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          {item.reward < 1000 && <span className="item-reward" style={{ fontFamily: 'Jura, sans-serif' }}>{item.reward}</span>}
          {item.reward >= 1000 && <span className="item-reward" style={{ fontFamily: 'Jura, sans-serif' }}>{item.reward/1000}k</span>}
        </div>
      </div>
      {(isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name) || index === 0) && <button className="item-button" onClick={() => {setShopPopupOpened(true)}}>Plant</button>}
      {!isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name) && index !== 0 && <button className="item-button-disabled" disabled>Plant</button>}
    </div>
    {shopPopupOpened && <ShopPopUp item={item} handlePlantClick={handlePlantClick} handlePlantTonClick={handlePlantTonClick} setShopPopupOpened={setShopPopupOpened} score={score} errorPlanting={errorPlanting} setErrorPlanting={setErrorPlanting}/>}
    </>
  );
};

//Planted tree
interface PlantItemTreeProps {
  item: Plant;
  key: number;
  index: number;
  score: number;
  setScore: (score: number) => void;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  cs: CloudStorage | null;
  activeField: number;
  setActiveField: (field: number) => void;
  plantedVegetables: Map<string, number>;
  setPlantedVegetables: (plantedVegetable: Map<string, number>) => void;
  passStatus: boolean;
}

const PlantItemTree: React.FC<PlantItemTreeProps> = ({ passStatus, item, key, index, score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
  const [shopPopupOpened, setShopPopupOpened] = useState<boolean>(false)
  const [errorPlanting, setErrorPlanting] = useState(false)

  const handlePlantClick = () => {
    const newField : Field = {vegetable: item.name, plantedAt: new Date(), duration: item.duration}
    const updatedFields = [...fields];

    // Replace or modify the element at the specified index (key)
    var changed = -1
    updatedFields.forEach((field, index) => {
      if(field.vegetable === "" && changed === -1){
        updatedFields[index] = newField;
        changed = index
      }
    });

    if(changed != -1){
      setFields(updatedFields)
      setFieldsCallback(cs, updatedFields)
      var newScore = score - item.cost;
      setScore(newScore)
      setScoreCallback(cs, newScore)
      var times = plantedVegetables.get(item.name)
      var newPlantedVegetables = plantedVegetables
      if(times !== undefined){
        times = times + 1
        newPlantedVegetables.set(item.name, times)
      }else{
        times = 1
        newPlantedVegetables.set(item.name, times)
      }
      setPlantedVegetables(newPlantedVegetables)
      setPlantedVegetablesCallback(cs, newPlantedVegetables)
      setCurrentPage(0) //move to fields
      setActiveField(changed)
    }else{
      setErrorPlanting(true)
    }
  };

  const handlePlantTonClick = () => {
    const newField : Field = {vegetable: item.name, plantedAt: new Date(), duration: item.duration}
    const updatedFields = [...fields];

    // Replace or modify the element at the specified index (key)
    var changed = -1
    updatedFields.forEach((field, index) => {
      if(field.vegetable === "" && changed === -1){
        updatedFields[index] = newField;
        changed = index
      }
    });

    if(changed != -1){
      setFields(updatedFields)
      setFieldsCallback(cs, updatedFields)
      var times = plantedVegetables.get(item.name)
      var newPlantedVegetables = plantedVegetables
      if(times !== undefined){
        times = times + 1
        newPlantedVegetables.set(item.name, times)
      }else{
        times = 1
        newPlantedVegetables.set(item.name, times)
      }
      setPlantedVegetables(newPlantedVegetables)
      setPlantedVegetablesCallback(cs, newPlantedVegetables)
      setCurrentPage(0) //move to fields
      setActiveField(changed)
    }else{
      setErrorPlanting(true)
      var newScore = score + item.cost;
      setScore(newScore)
      setScoreCallback(cs, newScore)
    }
  };

  return (
    <>
    <div className="shop-item">
      {!isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name) && (
        <div className="shop-overlay">
        <LockIcon />
        <span>Plant {3 - ((index > 0 ? plantedVegetables.get(plants[index - 1].name) || 0 : plantedVegetables.get(vegetables[vegetables.length - 1].name)) || 0)} more times { index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name} to unlock</span>
      </div>
      )}
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
          <div style={{ display: 'flex', flex: '60%', alignContent: 'center' }}>
            <div className="item-intext-image">
              <img src={hourglassImg} alt={item.name} />
            </div>
            {!passStatus && <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}>{item.time}</span>}
            {passStatus && <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}><del style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>{item.time}</del></span>}
          </div>
        </div>
        <div className="item-pricing">
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          {item.cost < 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost}</span>}
          {item.cost >= 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost/1000}k</span>}
          <EastIcon style={{ color: 'black', marginRight: '10px'}}/>
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          {item.reward < 1000 && <span className="item-reward" style={{ fontFamily: 'Jura, sans-serif' }}>{item.reward}</span>}
          {item.reward >= 1000 && <span className="item-reward" style={{ fontFamily: 'Jura, sans-serif' }}>{item.reward/1000}k</span>}
        </div>
      </div>
      {isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name) && <button className="item-button" onClick={() => {setShopPopupOpened(true)}}>Plant</button>}
      {!isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name) && <button className="item-button-disabled" disabled>Plant</button>}
    </div>
    {shopPopupOpened && <ShopPopUp item={item} handlePlantClick={handlePlantClick} handlePlantTonClick={handlePlantTonClick} setShopPopupOpened={setShopPopupOpened} score={score} errorPlanting={errorPlanting} setErrorPlanting={setErrorPlanting}/>}
    </>
  );
};

//Apple shop items
interface AppleShopItemProps {
  item: AppleItem;
  key: number;
  index: number;
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
}

const AppleShopItem: React.FC<AppleShopItemProps> = ({ item, key, index, appleScore, setAppleScore, cs }) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleTransactionSuccess = () => {
    var newAppleScore = appleScore + item.reward
    setAppleScore(newAppleScore)
    setAppleScoreCallback(cs, newAppleScore)
  }

  const handleTonPlantClicked = () => {
    handleTransaction(tonConnectUI, Math.floor(item.cost*1000000000).toString(), handleTransactionSuccess)
  };

  return (
    <>
    <div className="shop-item">
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
        </div>
        <div className="item-pricing">
          <div className="item-intext-image">
            <img src={tonIcon} alt={item.name} />
          </div>
          <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost} TON</span>
        </div>
      </div>
      {tonConnectUI.connected  && <button className="item-button-ton" onClick={handleTonPlantClicked}style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Buy</button>}
      {!tonConnectUI.connected && <button className="item-button-disabled" disabled>Buy</button>}
    </div>
    </>
  );
};

//Coin shop items
interface CoinShopItemProps {
  item: CoinItem;
  key: number;
  index: number;
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
}

const CoinShopItem: React.FC<CoinShopItemProps> = ({ item, key, index, score, setScore, cs }) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleTransactionSuccess = () => {
    var newScore = score + item.reward
    setScore(newScore)
    setScoreCallback(cs, newScore)
  }

  const handleTonPlantClicked = () => {
    handleTransaction(tonConnectUI, Math.floor(item.cost*1000000000).toString(), handleTransactionSuccess)
  };

  return (
    <>
    <div className="shop-item">
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
        </div>
        <div className="item-pricing">
          <div className="item-intext-image">
            <img src={tonIcon} alt={item.name} />
          </div>
          <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost} TON</span>
        </div>
      </div>
      {tonConnectUI.connected  && <button className="item-button-ton" onClick={handleTonPlantClicked}style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>Buy</button>}
      {!tonConnectUI.connected && <button className="item-button-disabled" disabled>Buy</button>}
    </div>
    </>
  );
};

interface ShopPopUpProps {
  setShopPopupOpened: (opened: boolean) => void;
  item: Plant;
  handlePlantClick : () => void;
  handlePlantTonClick : () => void;
  score: number;
  errorPlanting: boolean;
  setErrorPlanting: (error: boolean) => void;
}

const ShopPopUp: React.FC<ShopPopUpProps> = ({ handlePlantClick, handlePlantTonClick, setShopPopupOpened, item, score, errorPlanting, setErrorPlanting }) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleOverlayClick = () => {
    setShopPopupOpened(false)
    setErrorPlanting(false)
  };

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  };
  
  const handleRegularPlantClicked = () => {
    handlePlantClick()
  };

  const handleTonPlantClicked = () => {
    setShopPopupOpened(false)
    setErrorPlanting(false)
    const numberOfK : number = item.cost/1000
    var tonPrice : number = numberOfK*tonPerK

    if (tonPrice === 0) {
      tonPrice = tonPerK;
    }

    handleTransaction(tonConnectUI, Math.floor(tonPrice*1000000000).toString(), handlePlantTonClick)
  };

  return (
    <>
        <div className="shop-modal-overlay" onClick={handleOverlayClick} >
          <div  className="shop-modal-box" onClick={handlePopUpClick}>
            <button className="shop-popup-close-button" onClick={handleOverlayClick}><CloseRoundedIcon style={{height: '25px', width: '25px', borderRadius: '50%', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/></button>
            <div className='shop-popup-content'>
              <div className='shop-popup-title'>{item.name}</div>
              <div className='shop-popup-reward'>
                <img className='shop-money-icon' src={moneyImg} alt={"money"}/>                
                <div className='shop-reward-text'>
                  <p>You will receive {item.reward}</p>
                </div>
              </div> 
              <div className='shop-popup-buttons'>
                <div className='shop-popup-buttons-inner'>
                  <div className="item-pricing">
                    <div className="item-intext-image">
                      <img src={moneyImg} alt={item.name} />
                    </div>
                    {item.cost < 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost}</span>}
                    {item.cost >= 1000 && <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost/1000}k</span>}
                  </div>
                  {score >= item.cost && <button className='shop-popup-button' onClick={handleRegularPlantClicked} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/>PLANT<img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/></button>}
                  {score < item.cost && <button className='shop-popup-button-disabled' disabled style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/>PLANT<img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/></button>}
                </div>
                  <div className='shop-popup-buttons-inner'>
                    <div className="item-pricing">
                      <div className="item-intext-image">
                        <img src={moneyImg} alt={item.name} />
                      </div>
                      <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>Free</span>
                    </div>
                    {!tonConnectUI.connected && <button className='shop-popup-button-disabled'  disabled style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon}/>PLANT</button>}
                    {tonConnectUI.connected && <button className='shop-popup-ton-button' onClick={handleTonPlantClicked} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>PLANT</button>}
                  </div>
              </div>   
              {errorPlanting && <p style={{color: 'red', fontWeight: 'bold'}}>No empty pot available!</p>}         
            </div>
          </div>
        </div>
    </>
  );
}

const isVegetablePlantedEnough = (map: Map<string, number>, key: string): boolean => {
  const value = map.get(key);
  return value !== undefined && value >= 3;
};

export default ShopTab;
