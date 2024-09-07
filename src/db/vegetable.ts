import { Plant } from "../interfaces/Plant";
import lettuceImg from './../img/shopItems/lettuce.png';
import tomatoImg from './../img/shopItems/tomato.png';
import pepperImg from './../img/shopItems/pepper.png';
import radishImg from './../img/shopItems/radish.png';
import courgetteImg from './../img/shopItems/courgette.png';
import carrotImg from './../img/shopItems/carrot.png';
import asparagusImg from './../img/shopItems/asparagus.png'
import spinachImg from './../img/shopItems/spinach.png'
import appleImg from './../img/shopItems/apple.png'
import moneyImg from './../img/shopItems/dollar.png'
import pearImg from './../img/shopItems/pear.png'
import cherryImg from './../img/shopItems/cherry.png'
import { AppleItem } from "../interfaces/AppleItem";
import { CoinItem } from "../interfaces/CoinItem";

export const vegetables : Plant[] = [    
    { name: 'Radish', time: '2 min', cost: 20, reward: 40, image: radishImg, duration: 60*2 },
    { name: 'Lettuce', time: '5 min', cost: 60, reward: 120, image: lettuceImg, duration: 60*5  },
    { name: 'Spinach', time: '10 min', cost: 100, reward: 200, image: spinachImg, duration: 60*10  },
    { name: 'Carrot', time: '15 min', cost: 120, reward: 240, image: carrotImg, duration: 60*15  },
    { name: 'Tomato', time: '30 min', cost: 160, reward: 320, image: tomatoImg, duration: 60*30  },
    { name: 'Courgette', time: '45 min', cost: 200, reward: 400, image: courgetteImg, duration: 60*45 },
    { name: 'Pepper', time: '1 hr', cost: 300, reward: 600, image: pepperImg, duration: 60*60  },
    { name: 'Asparagus', time: '4 hr', cost: 1000, reward: 2000, image: asparagusImg, duration: 60*60*4  }
];

export const plants : Plant[] = [  
    { name: 'Cherry', time: '4 hr', cost: 25000, reward: 2500, image: cherryImg, duration: 60*60*4 },
    { name: 'Pear', time: '6 hr', cost: 50000, reward: 5000, image: pearImg, duration: 60*60*6 },
    { name: 'Apple', time: '8 hr', cost: 75000, reward: 7500, image: appleImg, duration: 60*60*8 }
];

export const appleShop : AppleItem[] = [
    {name: '5 Apples', cost: 0.08, reward: 5, image: appleImg},
    {name: '10 Apples', cost: 0.15, reward: 10, image: appleImg},
    {name: '20 Apples', cost: 0.30, reward: 20, image: appleImg},
    {name: '40 Apples', cost: 0.50, reward: 40, image: appleImg},
];

export const coinShop : CoinItem[] = [
    {name: '10k Coins', cost: 0.08, reward: 10000, image: moneyImg},
    {name: '25K Coins', cost: 0.18, reward: 25000, image: moneyImg},
    {name: '75K Coins', cost: 0.50, reward: 75000, image: moneyImg},
    {name: '150k Coins', cost: 0.90, reward: 150000, image: moneyImg},
];