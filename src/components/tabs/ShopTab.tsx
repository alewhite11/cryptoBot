import React, { useState } from 'react';
import lettuceImg from './../../img/shopItems/lettuce.png';
import tomatoImg from './../../img/shopItems/tomato.png';
import pepperImg from './../../img/shopItems/pepper.png';
import radishImg from './../../img/shopItems/radish.png';
import courgetteImg from './../../img/shopItems/courgette.png';
import carrotImg from './../../img/shopItems/carrot.png';
import orangeImg from './../../img/shopItems/orange.png';
import moneyImg from './../../img/shopItems/dollar.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import asparagusImg from './../../img/shopItems/asparagus.png'
import './../../App.css';
import EastIcon from '@mui/icons-material/East';
import { Plant } from '../../interfaces/Plant';
import { Field } from '../../interfaces/Field';
import { setFieldsCallback, setScoreCallback } from '../../db/cloudStorageFunctions';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { plants, plants2, plants3 } from '../../db/vegetable';



interface ShopTabProps {
  score: number;
  setScore: (score: number) => void;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  cs: CloudStorage | null;
  activeField: number;
  setActiveField: (field: number) => void;
}

const ShopTab: React.FC<ShopTabProps> = ({ score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shop:</h1>
        <div className="tab-buttons">
          <button className={activeTab === 0 ? "active-tab" : ""} onClick={() => setActiveTab(0)}>Plants</button>
          <button className={activeTab === 1 ? "active-tab" : ""} onClick={() => setActiveTab(1)}>Plants 2</button>
          <button className={activeTab === 2 ? "active-tab" : ""} onClick={() => setActiveTab(2)}>Plants 3</button>
        </div>
        <div className="shop-items">
          {activeTab === 0 && (
            <>
              {plants.map((item, index) => (
                <PlantItem item={item} key={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField}/>
              ))}
            </>
          )}
          {activeTab === 1 && (
            <>
              {plants2.map((item, index) => (
                <PlantItem item={item} key={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField}/>
              ))}
            </>
          )}
          {activeTab === 2 && (
            <>
              {plants3.map((item, index) => (
                <PlantItem item={item} key={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField}/>
              ))}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

interface PlantItemProps {
  item: Plant;
  key: number;
  score: number;
  setScore: (score: number) => void;
  setCurrentPage: (page: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  cs: CloudStorage | null;
  activeField: number;
  setActiveField: (field: number) => void;
}

const PlantItem: React.FC<PlantItemProps> = ({ item, key, score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField }) => {
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
    setCurrentPage(0) //move to fields
    setActiveField(changed)
  }else{
    setCurrentPage(0) //move to fields
    setActiveField(fields.length - 1)
  }
  };

  return (
    <div className="shop-item">
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
          <div style={{ display: 'flex', flex: '50%', alignContent: 'center' }}>
            <div className="item-intext-image">
              <img src={hourglassImg} alt={item.name} />
            </div>
            <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}>{item.time}</span>
          </div>
        </div>
        <div className="item-pricing">
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>{item.cost}</span>
          <EastIcon style={{ color: 'black', marginRight: '10px'}}/>
          <div className="item-intext-image">
            <img src={moneyImg} alt={item.name} />
          </div>
          <span className="item-reward" style={{ fontFamily: 'Jura, sans-serif' }}>{item.reward}</span>
        </div>
      </div>
      {score >= item.cost && <button className="item-button" onClick={handlePlantClick}>Plant</button>}
      {score < item.cost && <button className="item-button-disabled" disabled>Plant</button>}
    </div>
  );
};

export default ShopTab;
