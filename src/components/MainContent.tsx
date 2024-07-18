import React, { useEffect } from 'react';
import MainTab from './tabs/MainTab';
import WalletTab from './tabs/WalletTab';
import TasksTab from './tabs/TasksTab';
import InviteTab from './tabs/InviteTab';
import ShopTab from './tabs/ShopTab';
import { Field } from '../interfaces/Field';
import { CloudStorage } from '../interfaces/telegramInterfaces';
import { useState } from 'react';
import { Friend } from '../interfaces/Friend';
import PlantTab from './tabs/PlantTab';

interface MainContentProps {
  page: number;
  setCurrentPage: (page: number) => void;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  plantScore: number;
  setPlantScore: (score: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
  cs: CloudStorage | null;
  plantedVegetables: Map<string, number>;
  setPlantedVegetables: (plantedVegetable: Map<string, number>) => void;
  poolStatus: Map<string, boolean>;
  setPoolStatus: (pools: Map<string, boolean>) => void;
  friendList : Friend[];
  setFriendList: (list : Friend[]) => void;
  plantHourlyIncome: number;
  setPlantHourlyIncome: (score: number) => void;
  activeTab: number;
  setActiveTab: (val: number) => void;
  addClicked: boolean;
  setAddClicked: (val: boolean) => void;
  dailyStreak: number
}

const MainContent: React.FC<MainContentProps> = ({ dailyStreak, activeTab, setActiveTab, addClicked, setAddClicked, page, setCurrentPage, score, setScore, appleScore, setAppleScore, plantScore, setPlantScore, fields, setFields, tasks, setTasks, claimableTasks, setClaimableTasks, cs, plantedVegetables, setPlantedVegetables, poolStatus, setPoolStatus, friendList, setFriendList, plantHourlyIncome, setPlantHourlyIncome }) => {
  const [activeField, setActiveField] = useState(0)  //for the slider

  return (
    <div className="App" >
      {page === 0 && <MainTab score={score} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} activeField={activeField} setActiveField={setActiveField} cs={cs}/>}
      {page === 1 && <ShopTab activeTab={activeTab} setActiveTab={setActiveTab} addClicked={addClicked} setAddClicked={setAddClicked} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>}
      {page === 2 && <PlantTab appleScore={appleScore} plantScore={plantScore} setPlantScore={setPlantScore} poolStatus={poolStatus} setPoolStatus={setPoolStatus} plantHourlyIncome={plantHourlyIncome} setPlantHourlyIncome={setPlantHourlyIncome} cs={cs}/>}
      {page === 3 && <TasksTab dailyStreak={dailyStreak} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} cs={cs} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>}
      {page === 4 && <InviteTab friendList={friendList} setFriendList={setFriendList} cs={cs} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore}/>}
      {/*page === 5 && <WalletTab user={window.Telegram.WebApp.initDataUnsafe.user}/>*/}
    </div>
  );
};

export default MainContent;