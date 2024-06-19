import { useEffect, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';

declare global {
  interface Window {
      Telegram:any;
  }

}

function App() {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<WebAppUser | null>(null)
  const [cloudStorage, setCloudStorage] = useState<CloudStorage | null>(null)
  const [currentPage, setCurrentPage] = useState(0); //Used to track the active tab

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();

    const webappinit: WebAppInitData = window.Telegram.WebApp.initDataUnsafe;
    const u: WebAppUser | undefined = webappinit.user;

    if (u != undefined) {
      setUser(u);
    }

    const cs: CloudStorage = window.Telegram.WebApp.CloudStorage;
    if(cs != undefined){
      setCloudStorage(cs);
    }
  
  }, []);

  useEffect(() => {
    if (cloudStorage) {
      try {
        cloudStorage.getItem("score", (error, value) => {
          if (value !== undefined && !isNaN(parseInt(value, 10))) {
            setScore(parseInt(value, 10));
          }  
        });
      } catch (e) {}
    }
  }, [cloudStorage]);

  const handleClick = () => {
    setScore(prevScore => {
      const newScore = prevScore + 1;
      if(cloudStorage !== null){
        cloudStorage.setItem("score", newScore.toString(), (error: any, stored: boolean) => {});
      }
      return newScore;
    });
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
        <MainContent page={currentPage} user={user} score={score} handleClick={handleClick}/>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;