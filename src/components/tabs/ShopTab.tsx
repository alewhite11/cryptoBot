import React from 'react';
import lettuceImg from './../../img/shopItems/lettuce.png';
import moneyImg from './../../img/shopItems/dollar.png'
import hourglassImg from './../../img/shopItems/hourglass.png'
import './../../App.css';
import EastIcon from '@mui/icons-material/East';

interface Plant {
  name: string;
  time: string;
  cost: number;
  reward: number;
  image: string;
}

const items : Plant[] = [
    { name: 'Lettuce', time: '20 min', cost: 75, reward: 150, image: lettuceImg  }
    // Add more items here if needed
];

const ShopTab = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Plants:</h1>
                <div className="shop-items">
                  {items.map((item, index) => (
                    <PlantItem item={item} key={index} />
                  ))}
                </div>
            </header>
        </div>
    );
};

interface PlantItemProps {
  item: Plant;
}

const PlantItem: React.FC<PlantItemProps> = ({ item }) => {
  return (
    <div className="shop-item">
      <div className="item-image">
        <img src={`${item.image}`} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-info">
          <span className="item-name" style={{ fontFamily: 'Jura, sans-serif' }}>{item.name}</span>
          <div style={{ display: 'flex' }}>
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
      <button className="item-button">Plant</button>
    </div>
  );
};

export default ShopTab;
