import React from 'react';
import { WebAppUser } from '../interfaces/telegramInterfaces';
import MainTab from './tabs/MainTab';
import WalletTab from './tabs/WalletTab';
import TasksTab from './tabs/TasksTab';
import InviteTab from './tabs/InviteTab';
import ShopTab from './tabs/ShopTab';

interface MainContentProps {
  page: number;
  setCurrentPage: (page: number) => void;
  user: WebAppUser | null;
  score: number;
  handleClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ page, setCurrentPage, user, score, handleClick }) => {
  return (
    <div className="App" >
      {page === 0 && <MainTab user={user} score={score} handleClick={handleClick} setCurrentPage={setCurrentPage} />}
      {page === 1 && <ShopTab />}
      {page === 2 && <TasksTab />}
      {page === 3 && <InviteTab />}
    </div>
  );
};

export default MainContent;