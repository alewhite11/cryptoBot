import React from 'react';
import { WebAppUser } from '../interfaces/telegramInterfaces';
import MainTab from './tabs/MainTab';
import WalletTab from './tabs/WalletTab';
import TasksTab from './tabs/TasksTab';

interface MainContentProps {
  page: number;
  user: WebAppUser | null;
  score: number;
  handleClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ page, user, score, handleClick }) => {
  return (
    <div className="App">
      {page === 0 && <MainTab user={user} score={score} handleClick={handleClick} />}
      {page === 1 && <TasksTab />}
      {page === 2 && <WalletTab user={user} />}
    </div>
  );
};

export default MainContent;