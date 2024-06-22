import React from 'react';
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

interface Plant {
  name: string;
  time: string;
  cost: number;
  reward: number;
  image: string;
}

const items : Plant[] = [    
    { name: 'Radish', time: '10 min', cost: 20, reward: 40, image: radishImg  },
    { name: 'Lettuce', time: '20 min', cost: 60, reward: 120, image: lettuceImg  },
    { name: 'Spinach', time: '30 min', cost: 100, reward: 200, image: asparagusImg  },
    { name: 'Carrot', time: '40 min', cost: 120, reward: 240, image: carrotImg  },
    { name: 'Tomato', time: '50 min', cost: 160, reward: 320, image: tomatoImg  },
    { name: 'Courgette', time: '1 hr', cost: 200, reward: 400, image: courgetteImg  },
    { name: 'Pepper', time: '1 hr', cost: 240, reward: 480, image: pepperImg  },
    { name: 'Asparagus', time: '4 hr', cost: 1000, reward: 2000, image: asparagusImg  }
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
      <button className="item-button">Plant</button>
    </div>
  );
};

export default ShopTab;
