import React from 'react';
import MainTab from './tabs/MainTab';
import WalletTab from './tabs/WalletTab';
import TasksTab from './tabs/TasksTab';
import InviteTab from './tabs/InviteTab';
import ShopTab from './tabs/ShopTab';

interface MainContentProps {
  page: number;
  setCurrentPage: (page: number) => void;
  score: number;
}

const MainContent: React.FC<MainContentProps> = ({ page, setCurrentPage, score }) => {
  return (
    <div className="App" >
      {page === 0 && <MainTab score={score} setCurrentPage={setCurrentPage} />}
      {page === 1 && <ShopTab />}
      {page === 2 && <TasksTab />}
      {page === 3 && <InviteTab />}
    </div>
  );
};

export default MainContent;