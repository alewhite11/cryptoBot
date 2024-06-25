import { Plant } from "../interfaces/Plant";
import lettuceImg from './../img/shopItems/lettuce.png';
import tomatoImg from './../img/shopItems/tomato.png';
import pepperImg from './../img/shopItems/pepper.png';
import radishImg from './../img/shopItems/radish.png';
import courgetteImg from './../img/shopItems/courgette.png';
import carrotImg from './../img/shopItems/carrot.png';
import orangeImg from './../img/shopItems/orange.png';
import asparagusImg from './../img/shopItems/asparagus.png'

export const plants : Plant[] = [    
    { name: 'Radish', time: '10 min', cost: 20, reward: 40, image: radishImg, duration: 60*10 },
    { name: 'Lettuce', time: '20 min', cost: 60, reward: 120, image: lettuceImg, duration: 60*20  },
    { name: 'Spinach', time: '30 min', cost: 100, reward: 200, image: asparagusImg, duration: 60*30  },
    { name: 'Carrot', time: '40 min', cost: 120, reward: 240, image: carrotImg, duration: 60*40  },
    { name: 'Tomato', time: '50 min', cost: 160, reward: 320, image: tomatoImg, duration: 60*50  },
    { name: 'Courgette', time: '1 hr', cost: 200, reward: 400, image: courgetteImg, duration: 60*60  },
    { name: 'Pepper', time: '1 hr', cost: 240, reward: 480, image: pepperImg, duration: 60*60  },
    { name: 'Asparagus', time: '4 hr', cost: 1000, reward: 2000, image: asparagusImg, duration: 60*60*4  }
];

export const plants2 : Plant[] = [    
    { name: 'Radish', time: '10 min', cost: 20, reward: 40, image: radishImg, duration: 60*10 },
    { name: 'Lettuce', time: '20 min', cost: 60, reward: 120, image: lettuceImg, duration: 60*20  },
    { name: 'Spinach', time: '30 min', cost: 100, reward: 200, image: asparagusImg, duration: 60*30  }
];

export const plants3 : Plant[] = [    
    { name: 'Courgette', time: '1 hr', cost: 200, reward: 400, image: courgetteImg, duration: 60*60  },
    { name: 'Pepper', time: '1 hr', cost: 240, reward: 480, image: pepperImg, duration: 60*60  },
    { name: 'Asparagus', time: '4 hr', cost: 1000, reward: 2000, image: asparagusImg, duration: 60*60*4  }
];