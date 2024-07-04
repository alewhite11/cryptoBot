import React, { useState } from 'react';
import moneyImg from './../../img/shopItems/dollar.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import './../../App.css';
import EastIcon from '@mui/icons-material/East';
import { Plant } from '../../interfaces/Plant';
import { Field } from '../../interfaces/Field';
import { setFieldsCallback, setPlantedVegetablesCallback, setScoreCallback } from '../../db/cloudStorageFunctions';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { vegetables, plants, plants3 } from '../../db/vegetable';

interface ShopTabProps {
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
}

const ShopTab: React.FC<ShopTabProps> = ({ score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div> 
        {/*<h1 className='title'>Shop:</h1>*/}
        <div className='bacheca'>
          <div className="tab-buttons">
            <button className={activeTab === 0 ? "active-tab" : ""} onClick={() => setActiveTab(0)}>Vegetables</button>
            <button className={activeTab === 1 ? "active-tab" : ""} onClick={() => setActiveTab(1)}>Plants</button>
            <button className={activeTab === 2 ? "active-tab" : ""} onClick={() => setActiveTab(2)}>Plants 3</button>
          </div>
          <div className="shop-items">
            {activeTab === 0 && (
              <>
                {vegetables.map((item, index) => (
                  <PlantItem item={item} key={index}index={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
                ))}
              </>
            )}
            {activeTab === 1 && (
              <>
                {plants.map((item, index) => (
                  <PlantItemTree item={item} key={index} index={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
                ))}
              </>
            )}
            {activeTab === 2 && (
              <>
                {plants3.map((item, index) => (
                  <PlantItem item={item} key={index} index={index} score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
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
}

const PlantItem: React.FC<PlantItemProps> = ({ item, key, index, score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
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
    setCurrentPage(0) //move to fields
    setActiveField(fields.length - 1)
  }
  };

  return (
    <div className="shop-item">
      {!isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name) && (
        <div className="shop-overlay">
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
            <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}>{item.time}</span>
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
      {score >= item.cost && isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name) && <button className="item-button" onClick={handlePlantClick}>Plant</button>}
      {(score < item.cost || !isVegetablePlantedEnough(plantedVegetables, index > 0 ? vegetables[index - 1].name : item.name)) && <button className="item-button-disabled" disabled>Plant</button>}
    </div>
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
}

const PlantItemTree: React.FC<PlantItemTreeProps> = ({ item, key, index, score, setScore, setCurrentPage, fields, setFields, cs, activeField, setActiveField, plantedVegetables, setPlantedVegetables }) => {
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
    setCurrentPage(0) //move to fields
    setActiveField(fields.length - 1)
  }
  };

  return (
    <div className="shop-item">
      {!isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : plants[plants.length - 1].name) && (
        <div className="shop-overlay">
          <span>Plant {3 - ((index > 0 ? plantedVegetables.get(plants[index - 1].name) : plantedVegetables.get(vegetables[vegetables.length - 1].name)) || 0)} more times {index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name} to unlock</span>
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
            <span className="item-time" style={{ fontFamily: 'Jura, sans-serif' }}>{item.time}</span>
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
      {score >= item.cost && isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name) && <button className="item-button" onClick={handlePlantClick}>Plant</button>}
      {(score < item.cost || !isVegetablePlantedEnough(plantedVegetables, index > 0 ? plants[index - 1].name : vegetables[vegetables.length - 1].name)) && <button className="item-button-disabled" disabled>Plant</button>}
    </div>
  );
};

const isVegetablePlantedEnough = (map: Map<string, number>, key: string): boolean => {
  const value = map.get(key);
  return value !== undefined && value >= 3;
};

export default ShopTab;