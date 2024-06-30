import React from 'react';
import MainTab from './tabs/MainTab';
import WalletTab from './tabs/WalletTab';
import TasksTab from './tabs/TasksTab';
import InviteTab from './tabs/InviteTab';
import ShopTab from './tabs/ShopTab';
import { Field } from '../interfaces/Field';
import { CloudStorage } from '../interfaces/telegramInterfaces';
import { useState } from 'react';

interface MainContentProps {
  page: number;
  setCurrentPage: (page: number) => void;
  score: number;
  setScore: (score: number) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  tasks: boolean[];
  setTasks: (tasks: boolean[]) => void;
  claimableTasks: boolean[];
  setClaimableTasks: (tasks: boolean[]) => void;
  cs: CloudStorage | null;
}

const MainContent: React.FC<MainContentProps> = ({ page, setCurrentPage, score, setScore, fields, setFields, tasks, setTasks, claimableTasks, setClaimableTasks, cs }) => {
  const [activeField, setActiveField] = useState(0)  //for the slider

  return (
    <div className="App" >
      {page === 0 && <MainTab score={score} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} setScore={setScore} activeField={activeField} setActiveField={setActiveField} cs={cs}/>}
      {page === 1 && <ShopTab score={score} setScore={setScore} setCurrentPage={setCurrentPage} fields={fields} setFields={setFields} cs={cs} activeField={activeField} setActiveField={setActiveField}/>}
      {page === 2 && <TasksTab score={score} setScore={setScore} cs={cs} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks}/>}
      {page === 3 && <InviteTab />}
    </div>
  );
};

export default MainContent;