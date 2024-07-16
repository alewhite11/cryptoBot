import appleImg from './../../img/shopItems/apple.png'
import { Pool } from '../../interfaces/Pool';
import { FaFeatherPointed } from "react-icons/fa6";
import { setPlantHourlyIncomeCallback, setPoolStatusCallback } from '../../db/cloudStorageFunctions'
import { CloudStorage } from '../../interfaces/telegramInterfaces'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { pools } from '../../db/pools';
import { TonConnectButton } from '@tonconnect/ui-react';



interface PlantTabProps {
  appleScore: number;
  plantScore: number;
  setPlantScore: (score: number) => void;
  poolStatus: Map<string, boolean>;
  setPoolStatus: (pools: Map<string, boolean>) => void;
  plantHourlyIncome: number;
  setPlantHourlyIncome: (score: number) => void;
  cs: CloudStorage | null;
}

const PlantTab: React.FC<PlantTabProps> = ({ appleScore, plantScore, setPlantScore, poolStatus, setPoolStatus, plantHourlyIncome, setPlantHourlyIncome, cs }) => {
  return(
    <div className="App">
      <header className="App-header">
        <div className="plant-top-section">
          <h1 className="plant-tab-title">Plant Balance</h1>
          <div className="plant-tab-balance">
            <p className="plant-tab-balance-text">{plantScore.toFixed(2)}</p>
          </div>
          <TonConnectButton style={{marginBottom: '50px'}}/>
        </div>
        <div className="plant-bottom-section">
          <div className="plant-tab-apple">
            <p className="plant-tab-apple-balance-text">{appleScore}</p>
            <img className='main-balance-icon' src={appleImg} alt={"apple"} style={{height: '30px', width: '30px'}} />
          </div>
          <div className='pool-items'>
            {pools.map((pool, index) => (
                <PoolItem pool={pool} appleScore={appleScore} plantScore={plantScore} setPlantScore={setPlantScore} poolStatus={poolStatus} setPoolStatus={setPoolStatus} plantHourlyIncome={plantHourlyIncome} setPlantHourlyIncome={setPlantHourlyIncome} cs={cs}/>
            ))}
          </div>
        </div> 
      </header>
    </div>
  );
}

interface PoolItemProps {
    pool : Pool;
    appleScore: number;
    plantScore: number;
    setPlantScore: (score: number) => void;
    poolStatus: Map<string, boolean>;
    setPoolStatus: (pools: Map<string, boolean>) => void;
    plantHourlyIncome: number;
    setPlantHourlyIncome: (score: number) => void;
    cs: CloudStorage | null;
}

const PoolItem : React.FC<PoolItemProps> = ({ pool, appleScore, plantScore, setPlantScore, poolStatus, setPoolStatus, plantHourlyIncome, setPlantHourlyIncome, cs }) => {
    const handleJoinClick = () => {
      var newIncome = plantHourlyIncome + pool.earning;
      setPlantHourlyIncome(newIncome)
      setPlantHourlyIncomeCallback(cs, newIncome)
      var newPoolStatus : Map<string, boolean> = poolStatus
      newPoolStatus.set(pool.name, true)
      setPoolStatus(newPoolStatus)
      setPoolStatusCallback(cs, newPoolStatus)
    };

    return(
        <div className='pool-item'>
            <img src={pool.img} alt={pool.name} style={{height: '40px', width: '60px', paddingLeft: '5px'}}/>
            <div className='pool-content'>
              <div className='pool-name'>
                <p>{pool.name}</p>
              </div>
              <div className='pool-details'>
                <FaFeatherPointed color='purple' style={{paddingRight: '5px'}}/>
                <p>Earnings: {pool.earning} plant/h</p>
              </div>
              <div className='pool-details'>
                <FaFeatherPointed color='purple' style={{paddingRight: '5px'}}/>
                <p>Price: {pool.price}</p>
                <img className='main-balance-icon' src={appleImg} alt={"apple"} style={{height: '30px', width: '30px'}} />
              </div>
            </div>
            {(appleScore >= pool.price && !isPoolOwned(poolStatus, pool.name)) && <button className='pool-btn' onClick={handleJoinClick}>JOIN</button>}
            {(appleScore < pool.price && !isPoolOwned(poolStatus, pool.name)) && <button className='pool-btn-disabled'>JOIN</button>}
            {isPoolOwned(poolStatus, pool.name) && <DoneOutlineIcon/>}
        </div>
    );
}

const isPoolOwned = (map: Map<string, boolean>, key: string): boolean => {
  const value = map.get(key);
  return value !== undefined && value === true;
};

export default PlantTab;