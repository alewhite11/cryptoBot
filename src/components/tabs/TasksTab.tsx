import React, { useEffect, useRef, useState } from 'react';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { Task } from '../../interfaces/Task';
import { dailyTasks } from '../../db/tasks';
import arrowImg from './../../img/taskPage/arrow.png'
import moneyImg from './../../img/shopItems/dollar.png'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { setClaimableCallback, setScoreCallback, setTasksCallback } from '../../db/cloudStorageFunctions';
import CircularProgress from '@mui/material/CircularProgress';

var checkChannelMembershipUrl : string = 'https://api.telegram.org/bot6902319344:AAG6ntvcf5-_JZiOtNmW0gIfeiSZDgmTZok'

interface TasksTabProps {
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({ score, setScore, cs, tasks, setTasks, claimableTasks, setClaimableTasks }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div> 
        {/*<h1 className='title'>Tasks:</h1>*/}
        <div className='bacheca'>
          <div className="tab-buttons">
            <button className={activeTab === 0 ? "active-tab" : ""} onClick={() => setActiveTab(0)}>Daily</button>
            <button className={activeTab === 1 ? "active-tab" : ""} onClick={() => setActiveTab(1)}>One time</button>
            <button className={activeTab === 2 ? "active-tab" : ""} onClick={() => setActiveTab(2)}>Combo</button>
          </div>
          <div className="task-items">
            {activeTab === 0 && (
              <>
                {dailyTasks.map((item, index) => (
                  <TaskItem item={item} key={index} score={score} setScore={setScore} cs={cs} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>
                ))}              
              </>
            )}
            {activeTab === 1 && (
              <>
              
              </>
            )}
            {activeTab === 2 && (
              <>
              
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

interface TaskItemProps {
  item: Task;
  key: number;
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, key, score, setScore, cs, tasks, setTasks, claimableTasks, setClaimableTasks }) => {
  const [taskOpened, setTaskOpened] = useState<boolean>(false)
  
  const handleTaskClick = () => {
    setTaskOpened(true)
  };

  return (
    <>
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
        <DoneOutlineIcon/>
      </div>}
    </div>
    {(taskOpened && tasks[item.id] !== true) && <TaskPopUp item={item} key={key} score={score} setScore={setScore} cs={cs} setTaskOpened={setTaskOpened} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>}
    </>
  );
};

interface TaskPopUp {
  item: Task;
  key: number;
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
  setTaskOpened: (opened: boolean) => void;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
}

const TaskPopUp: React.FC<TaskPopUp> = ({ item, key, score, setScore, cs, setTaskOpened, tasks, setTasks,claimableTasks, setClaimableTasks }) => {
  const [loading, setLoading] = useState(false);
  const [errorClaiming, setErrorClaiming] = useState(false)

  const handleOverlayClick = () => {
    setTaskOpened(false);
  };

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTaskOpened(true);
  };

  const handleClaimClick = async () => {
    setLoading(true);
    if(item.type === 'telegram'){
      const endpoint = `${checkChannelMembershipUrl}/getChatMember?chat_id=${item.channelId}&user_id=${window.Telegram.WebApp.initDataUnsafe.user.id}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
    
        if (data.ok && (data.result.status === 'member' || data.result.status === 'administrator' || data.result.status === 'creator')) {
          setScoreCallback(cs, score + item.revenue)
          setScore(score + item.revenue)
          const updatedTasks = [...tasks];
          updatedTasks[item.id] = true
          setTasksCallback(cs, updatedTasks)
          setTasks(updatedTasks)
          setTaskOpened(false)
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
    }
  }

  const handleGoClick = () => { 
    const updatedClaimableTasks = [...claimableTasks];
    updatedClaimableTasks[item.id] = true
    setClaimableCallback(cs, updatedClaimableTasks)
    setClaimableTasks(updatedClaimableTasks)
    window.location.href = item.link
  };

  return (
    <>
        <div className="modal-overlay" onClick={handleOverlayClick} >
          <div  className="modal-box" onClick={handlePopUpClick}>
            <div className='popup-content'>
              <div className='popup-title'>{item.text}</div>
              <div className='task-reward'>
                <img className='task-money-icon' src={moneyImg} alt={"money"}/>                
                <div className='task-reward-text'>
                  <p>You receive {item.revenue}</p>
                </div>
              </div>
              <div className='task-warning'>
                <p>NOTE: if you cheat, you will be charged double!!</p>
              </div>
              <button className='main-taskpopup-button' onClick={handleGoClick}>GO</button>
              {claimableTasks[item.id] !== true && <button className='main-taskpopup-button-disabled' onClick={handleClaimClick} disabled>CLAIM</button>}
              {claimableTasks[item.id] === true && <button className='main-taskpopup-button' onClick={handleClaimClick}>{loading ? <CircularProgress size={20} color="inherit" /> : "CLAIM"}</button>}
              {errorClaiming && <p style={{color: 'red', fontWeight: 'bold'}}>Task not completed, please retry!</p>}
            </div>
          </div>
        </div>
    </>
  );
}
  
export default TasksTab;