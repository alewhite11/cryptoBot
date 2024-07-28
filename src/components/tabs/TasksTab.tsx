import React, { useEffect, useRef, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { Task } from '../../interfaces/Task';
import { dailyTasks } from '../../db/tasks';
import arrowImg from './../../img/taskPage/arrow.png'
import moneyImg from './../../img/shopItems/dollar.png'
import appleImg from './../../img/shopItems/apple.png'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { setAppleScoreCallback, setClaimableCallback, setLastDailyClaimCallback, setScoreCallback, setTasksCallback } from '../../db/cloudStorageFunctions';
import CircularProgress from '@mui/material/CircularProgress';
import chestImg from './../../img/chests/closed_Chest.jpg'
import chestOpening from './../../video/chest_opening/generalChestOpening.mp4'
import { chests } from '../../db/chests';
import { Chest } from '../../interfaces/Chest';
import tonIcon from './../../img/invitePage/ton.png'
import { useTonConnectUI } from '@tonconnect/ui-react';
import { dailyCheckIn } from '../../db/tonCosts';
import { handleTransaction } from '../../db/transactions';
import { dailyPrices } from '../../db/dailyClaimPrices';
import { Button, Input, Space } from 'antd';

var checkChannelMembershipUrl : string = 'https://api.telegram.org/bot6902319344:AAG6ntvcf5-_JZiOtNmW0gIfeiSZDgmTZok'

interface TasksTabProps {
  setCurrentPage: (page: number) => void;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
  dailyStreak: number
}

const TasksTab: React.FC<TasksTabProps> = ({ setCurrentPage, dailyStreak, score, setScore, appleScore, setAppleScore, cs, tasks, setTasks, claimableTasks, setClaimableTasks }) => {
  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div> 
        {/*<h1 className='title'>Tasks:</h1>*/}
        <div className='bacheca'>
          <div className="task-items">
            {dailyTasks.slice().sort((a, b) => {
              const aTask = tasks[a.id];
              const bTask = tasks[b.id];
      
              // If `tasks[a.id]` is false and `tasks[b.id]` is true, place `a` before `b`
              if (aTask === false && bTask === true) return -1;
              // If `tasks[a.id]` is true and `tasks[b.id]` is false, place `b` before `a`
              if (aTask === true && bTask === false) return 1;
              // If both are the same, maintain original order
              return 0;
            }).map((item, index) => (
                  <TaskItem setCurrentPage={setCurrentPage} dailyStreak={dailyStreak} item={item} key={index} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>
                ))}              
          </div>
        </div>
      </header>
    </div>
  );
};

interface TaskItemProps {
  setCurrentPage: (page: number) => void;
  item: Task;
  key: number;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
  dailyStreak: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ setCurrentPage, dailyStreak, item, key, score, setScore, appleScore, setAppleScore, cs, tasks, setTasks, claimableTasks, setClaimableTasks }) => {
  const [taskOpened, setTaskOpened] = useState<boolean>(false)
  const [showChest, setShowChest] = useState(false)
  const [foundChest, setFoundChest] = useState<Chest>(chests[0])
  
  const handleTaskClick = () => {
    setTaskOpened(true)
  };

  return (
    <>
    {showChest && <ChestItem setShowChest={setShowChest} setTaskOpened={setTaskOpened} foundChest={foundChest}/>}
    <div className="task-item"  onClick={handleTaskClick}>
      <div className="task-image">
        <img src={`${item.image}`} alt={"task"} />
      </div>
      <div className="task-text">
        <p>{item.title}</p>
      </div>
      {tasks[item.id] !== true && 
      <div className='task-image'>
        <img src={arrowImg} alt={"task"}/>
      </div>}
      {tasks[item.id] === true && 
      <div className='task-image'>
        <DoneOutlineIcon style={{paddingRight: '10px'}}/>
      </div>}
    </div>
    {(taskOpened && tasks[item.id] !== true && item.type !== 'dailyTask') && <TaskPopUp setShowChest={setShowChest}  setFoundChest={setFoundChest} setCurrentPage={setCurrentPage} item={item} key={key} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs} setTaskOpened={setTaskOpened} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>}
    {(taskOpened && tasks[item.id] !== true && item.type === 'dailyTask') && <DailyTaskPopUp dailyStreak={dailyStreak} item={item} key={key} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs} setTaskOpened={setTaskOpened} tasks={tasks} setTasks={setTasks} />}
    </>
  );
};

interface TaskPopUpProps {
  setCurrentPage: (page: number) => void;
  item: Task;
  key: number;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
  setTaskOpened: (opened: boolean) => void;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
  setShowChest: (show: boolean) => void;
  setFoundChest: (chest: Chest) => void;
}

const TaskPopUp: React.FC<TaskPopUpProps> = ({ setShowChest, setFoundChest, setCurrentPage, item, key, score, setScore, appleScore, setAppleScore, cs, setTaskOpened, tasks, setTasks,claimableTasks, setClaimableTasks }) => {
  const [loading, setLoading] = useState(false);
  const [errorClaiming, setErrorClaiming] = useState(false)
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [secretValue, setSecretValue] = useState('');
  const [wrongSecret, setWrongSecret] = useState(false)
  const [claimed, setClaimed] = useState(false) //Used to make users double claim

  const handleOverlayClick = () => {
    setTaskOpened(false);
  };

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleClaimClick = async (event: React.MouseEvent) => {
    setLoading(true);
    var x = getRandomNumber(1,100000)
    var foundChest = chests.find(chest => x >= chest.minProb && x <= chest.maxProb);
    setFoundChest(foundChest!!)
    if(item.type === 'telegram'){
      const endpoint = `${checkChannelMembershipUrl}/getChatMember?chat_id=${item.channelId}&user_id=${window.Telegram.WebApp.initDataUnsafe.user.id}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
    
        if (data.ok && (data.result.status === 'member' || data.result.status === 'administrator' || data.result.status === 'creator')) {
          setShowChest(true)
          setScoreCallback(cs, score + foundChest!!.score)
          setScore(score + foundChest!!.score)
          setAppleScoreCallback(cs, appleScore + foundChest!!.appleScore)
          setAppleScore(appleScore + foundChest!!.appleScore)
          const updatedTasks = [...tasks];
          updatedTasks[item.id] = true
          setTasksCallback(cs, updatedTasks)
          setTasks(updatedTasks)
          setLoading(false)
        } else {
          setLoading(false)
          setErrorClaiming(true)
        }
      } catch (error) {
        console.error('Error fetching the API:', error);
        setLoading(false)
        setErrorClaiming(true)
        return false;
      }
    } else if(item.type === 'walletConnect'){
      if(tonConnectUI.connected === true){
        setShowChest(true)
        setScoreCallback(cs, score + foundChest!!.score)
        setScore(score + foundChest!!.score)
        setAppleScoreCallback(cs, appleScore + foundChest!!.appleScore)
        setAppleScore(appleScore + foundChest!!.appleScore)
        const updatedTasks = [...tasks];
        updatedTasks[item.id] = true
        setTasksCallback(cs, updatedTasks)
        setTasks(updatedTasks)
        setLoading(false)
      } else {
        setLoading(false)
        setErrorClaiming(true)
      }
    } else if(item.type === 'youtube'){
      if(secretValue === item.channelId){
        //User inserted right secret value
        setShowChest(true)
        setScoreCallback(cs, score + foundChest!!.score)
        setScore(score + foundChest!!.score)
        setAppleScoreCallback(cs, appleScore + foundChest!!.appleScore)
        setAppleScore(appleScore + foundChest!!.appleScore)
        const updatedTasks = [...tasks];
        updatedTasks[item.id] = true
        setTasksCallback(cs, updatedTasks)
        setTasks(updatedTasks)
        setLoading(false)
      }else{
        //Wrong secret
        setLoading(false)
        setWrongSecret(true)
      }
    } else if(item.type === 'openAndClaim'){
      if(!claimed){
        setClaimed(true)
        setLoading(false)
        setErrorClaiming(true)
      }else{
        setShowChest(true)
        setScoreCallback(cs, score + foundChest!!.score)
        setScore(score + foundChest!!.score)
        setAppleScoreCallback(cs, appleScore + foundChest!!.appleScore)
        setAppleScore(appleScore + foundChest!!.appleScore)
        const updatedTasks = [...tasks];
        updatedTasks[item.id] = true
        setTasksCallback(cs, updatedTasks)
        setTasks(updatedTasks)
        setLoading(false)
      }
    }
  }

  const handleGoClick = () => { 
    const updatedClaimableTasks = [...claimableTasks];
    updatedClaimableTasks[item.id] = true
    setClaimableCallback(cs, updatedClaimableTasks)
    setClaimableTasks(updatedClaimableTasks)
    if(item.type === 'telegram'){
      window.Telegram.WebApp.openTelegramLink(item.link)
    }else if(item.type === 'walletConnect'){
      setCurrentPage(2)
    }else if(item.type === 'youtube'){
      window.Telegram.WebApp.openLink(item.link)
    }else if(item.type === 'openAndClaim'){
      window.Telegram.WebApp.openLink(item.link)
    }
  };

  return (
    <>  
        <div className="modal-overlay" onClick={handleOverlayClick} >
          <div  className="modal-box" onClick={handlePopUpClick}>
            <button className="main-popup-close-button" onClick={handleOverlayClick}><CloseRoundedIcon style={{height: '25px', width: '25px', borderRadius: '50%', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/></button>
            <div className='popup-content'>
              <div className='popup-title'>{item.text}</div>
              <div className='task-reward'>               
                <div className='task-reward-text'>
                  <p>You will receive a chest containing one random prize!</p>
                </div>
              </div>
              <div className='task-warning'>
                <p>NOTE: if you cheat, you will be charged double!!</p>
              </div>
              <button className='main-taskpopup-button' onClick={handleGoClick}>GO</button>
              {item.type === 'youtube' && <>
                <Space direction="horizontal">
                  <Input placeholder="Enter the secret word" value={secretValue} onChange={(e) => {setSecretValue(e.target.value);}} />
                  {claimableTasks[item.id] !== true && <Button className='main-taskpopup-button-disabled'>Claim</Button>}
                  {claimableTasks[item.id] === true && <Button className='main-taskpopup-button' onClick={handleClaimClick}>{loading ? <CircularProgress size={20} color="inherit" /> : "CLAIM"}</Button>}
                </Space>
              </>}
              {item.type !== 'youtube' && claimableTasks[item.id] !== true && <button className='main-taskpopup-button-disabled' onClick={handleClaimClick} disabled>CLAIM</button>}
              {item.type !== 'youtube' && claimableTasks[item.id] === true && <button className='main-taskpopup-button' onClick={handleClaimClick}>{loading ? <CircularProgress size={20} color="inherit" /> : "CLAIM"}</button>}
              {errorClaiming && <p style={{color: 'red', fontWeight: 'bold'}}>Task not completed, please retry!</p>}
              {wrongSecret && <p style={{color: 'red', fontWeight: 'bold'}}>Wrong secret, please retry!</p>}
            </div>
          </div>
        </div>
    </>
  );
}

interface DailyTaskPopUpProps {
  item: Task;
  key: number;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  cs: CloudStorage | null;
  setTaskOpened: (opened: boolean) => void;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  dailyStreak: number
}

const DailyTaskPopUp: React.FC<DailyTaskPopUpProps> = ({ dailyStreak,  item, key, score, setScore, appleScore, setAppleScore, cs, setTaskOpened, tasks, setTasks }) => {
  const [showChest, setShowChest] = useState(false)
  const [foundChest, setFoundChest] = useState<Chest>(chests[0])
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleOverlayClick = () => {
    setTaskOpened(false);
  };

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleRegularClaimClick = () => {
    var newScore : number = dailyPrices[(dailyStreak - 1)%7].score
    setScoreCallback(cs, score + newScore)
    setScore(score + newScore)
    var newAppleScore : number = dailyPrices[(dailyStreak - 1)%7].appleScore
    setAppleScoreCallback(cs, appleScore + newAppleScore)
    setAppleScore(appleScore + newAppleScore)
    setLastDailyClaimCallback(cs, new Date())
    const updatedTasks = [...tasks];
    updatedTasks[item.id] = true
    setTasksCallback(cs, updatedTasks)
    setTasks(updatedTasks)
    setTaskOpened(false)
  }

  const handleRegularx3ClaimClick = () => {
    var newScore : number = (dailyPrices[(dailyStreak - 1)%7].score)*3
    setScoreCallback(cs, score + newScore)
    setScore(score + newScore)
    var newAppleScore : number = (dailyPrices[(dailyStreak - 1)%7].appleScore)*3
    setAppleScoreCallback(cs, appleScore + newAppleScore)
    setAppleScore(appleScore + newAppleScore)
    setLastDailyClaimCallback(cs, new Date())
    const updatedTasks = [...tasks];
    updatedTasks[item.id] = true
    setTasksCallback(cs, updatedTasks)
    setTasks(updatedTasks)
    setTaskOpened(false)
  }

  const handleTonClaimClick = () => {
    setTaskOpened(false)
    
    handleTransaction(tonConnectUI, Math.floor(dailyCheckIn*1000000000).toString(), handleRegularx3ClaimClick)
  }

  return (
    <>  
        <div className="modal-overlay" onClick={handleOverlayClick} >
          <div  className="modal-box" onClick={handlePopUpClick}>
            <button className="main-popup-close-button" onClick={handleOverlayClick}><CloseRoundedIcon style={{height: '25px', width: '25px', borderRadius: '50%', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/></button>
            <div className='popup-content'>
              <div className='popup-title'>{item.text}</div>
              {dailyPrices[(dailyStreak - 1)%7].score > 0 && <div className='task-reward'>               
                <div className='task-reward-text'>
                  <p>Day {dailyStreak}</p>
                  <p>You receive {dailyPrices[(dailyStreak - 1)%7].score}</p>
                </div>
                <img className='task-money-icon' src={moneyImg} alt={"money"}/> 
              </div>}
              {dailyPrices[(dailyStreak - 1)%7].appleScore > 0 && <div className='task-reward'>                
                <div className='task-reward-text'>
                  <p>Day {dailyStreak}</p>
                  <p>You receive {dailyPrices[(dailyStreak - 1)%7].appleScore}</p>
                </div>
                <img className='task-money-icon' src={appleImg} alt={"money"}/>
              </div>}
              <div className='task-dt-popup-buttons'>
                <div className='task-dt-popup-buttons-inner'>
                  <div className="item-pricing">
                    <div className="item-intext-image">
                      <img src={moneyImg} style={{opacity: 0}} />
                    </div>
                    <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}></span>
                  </div>
                  <button className='task-dt-popup-button' onClick={handleRegularClaimClick} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/>CLAIM<img style={{height: '9px', width: '9px', opacity: 0}} src={tonIcon}/></button>
                </div>
                  <div className='task-dt-popup-buttons-inner'>
                    <div className="item-pricing">
                      <div className="item-intext-image">
                        <img src={moneyImg} style={{opacity: 0}} />
                      </div>
                      <span className="item-cost" style={{ fontFamily: 'Jura, sans-serif' }}>Claim x3</span>
                    </div>
                    {!tonConnectUI.connected && <button className='task-dt-popup-button-disabled'  disabled style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon}/>CLAIM</button>}
                    {tonConnectUI.connected && <button className='task-dt-popup-ton-button' onClick={handleTonClaimClick} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><img style={{height: '18px', width: '18px'}} src={tonIcon} alt={"TON"}/>CLAIM</button>}
                  </div>
              </div>   
            </div>
          </div>
        </div>
    </>
  );
}

interface ChestItemProps {
  setShowChest: (operator: boolean) => void;
  setTaskOpened: (operator: boolean) => void;
  foundChest: Chest;
}

export const ChestItem: React.FC<ChestItemProps> = ({ setShowChest, setTaskOpened, foundChest }) => {
  const [imageClicked, setImageClicked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const videoClicked = () => {
    setShowChest(false);
    setTaskOpened(false);
  };

  return (
    <div className='chest-container'>
      {!imageClicked &&(
        <div className='chest-img'>
          <img className='chest-img' src={chestImg} alt="chest" onClick={() => setImageClicked(true)}/>
        </div>
      )}
      {imageClicked && !videoLoaded &&(
        <div className='chest-img'>
          <img className='chest-img' style={{zIndex: '10003'}} src={chestImg} alt="chest" />
        </div>
      )}
      {imageClicked && !videoEnded &&(
        <div className='chest-vid'>
          <video className='chest-video' style={{zIndex: '10002'}} src={chestOpening} onCanPlay={() => setVideoLoaded(true)} onEnded={() => setVideoEnded(true)} autoPlay muted/>
        </div>
      )}
      {imageClicked &&(
        <div className='chest-img'>
          <img className='chest-img' style={{zIndex: '10000'}} src={foundChest.image} onClick={videoClicked} alt="chest" />
        </div>
      )}
    </div>
  );
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export default TasksTab;