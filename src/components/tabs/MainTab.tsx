import React from 'react';
import { WebAppUser } from '../../interfaces/telegramInterfaces';

interface MainTabProps {
  user: WebAppUser | null;
  score: number;
  handleClick: () => void;
}

const MainTab: React.FC<MainTabProps> = ({ user, score, handleClick }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Clicking Game up</h1>
        <p>Hi {user?.first_name ? user.first_name : 'Guest'}, welcome to our clicking game</p>
        <button onClick={handleClick}>Click me!</button>
        <p>Score: <span>{score}</span></p>
      </header>
    </div>
  );
};

export default MainTab;