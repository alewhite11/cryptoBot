import React, { useEffect, useRef, useState } from 'react';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { Task } from '../../interfaces/Task';
import { dailyTasks } from '../../db/tasks';
import arrowImg from './../../img/taskPage/arrow.png'
import moneyImg from './../../img/shopItems/dollar.png'

interface TasksTabProps {
  score: number;
  setScore: (score: number) => void;
  cs: CloudStorage | null;
}

const TasksTab: React.FC<TasksTabProps> = ({ score, setScore, cs }) => {
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
                  <TaskItem item={item} key={index} score={score} setScore={setScore} cs={cs}/>
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
}

const TaskItem: React.FC<TaskItemProps> = ({ item, key, score, setScore, cs }) => {
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
      <div className='task-image'>
        <img src={arrowImg} alt={"task"}/>
      </div>
    </div>
    {taskOpened && <TaskPopUp item={item} key={key} score={score} setScore={setScore} cs={cs} setTaskOpened={setTaskOpened}/>}
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
}

const TaskPopUp: React.FC<TaskPopUp> = ({ item, key, score, setScore, cs, setTaskOpened }) => {
  const handleOverlayClick = () => {
    setTaskOpened(false);
  };

  const handlePopUpClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTaskOpened(true);
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
              <button className='main-taskpopup-button' onClick={() => {}}>GO</button>
              <button className='main-taskpopup-button-disabled' onClick={() => {}} disabled>CLAIM</button>
            </div>
          </div>
        </div>
    </>
  );
}
  
export default TasksTab;