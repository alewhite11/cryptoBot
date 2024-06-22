import { useEffect, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import LoadingPage from './components/LoadingPage';

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
  const [loading, setLoading] = useState(true)

  //Used to understand which of the two tasks finishes before (2s timeout or data loading)
  const [dataLoaded, setDataLoaded] = useState(false); //Set to true when data loaded
  const [timeoutExpired, setTimeoutExpired] = useState(false); //Set to true when timeout expired

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
          setDataLoaded(true)
        });
      } catch (e) {
        setDataLoaded(true)
      }
    }else{
      setDataLoaded(true)
    }
  }, [cloudStorage]);

  useEffect(() => {
    const delayPromise = new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    delayPromise.then(() => {
      setTimeoutExpired(true)
    });
  }, []);

  useEffect(() => {
    if (dataLoaded && timeoutExpired) {
      setLoading(false);
    }
  }, [dataLoaded, timeoutExpired]);

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
    <>
    {!loading &&
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
        <MainContent page={currentPage} setCurrentPage={setCurrentPage} score={score}/>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
    }   
    {loading &&
    <LoadingPage />
    }
    </>
  );
}

export default App;