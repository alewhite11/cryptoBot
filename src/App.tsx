import { useEffect, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import LoadingPage from './components/LoadingPage';
import { getFieldsCallback, getScoreCallback, setScoreCallback } from './db/cloudStorageFunctions';
import { Field } from './interfaces/Field';
import addImg from './img/mainPage/add.png'
import moneyImg from './img/shopItems/dollar.png'


declare global {
  interface Window {
      Telegram:any;
  }

}

function App() {
  const [user, setUser] = useState<WebAppUser | null>(null)
  const [cloudStorage, setCloudStorage] = useState<CloudStorage | null>(null)
  const [currentPage, setCurrentPage] = useState(0); //Used to track the active tab
  const [loading, setLoading] = useState(true) //Used to display Loading page

  //Application data states
  const [score, setScore] = useState(0);
  const [fields, setFields] = useState<Field[]>([])

  //Used to understand which of the two tasks finishes before (3s timeout or data loading)
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
        const fetchData = () => {
          if (!cloudStorage) return; // Ensure cloudStorage is initialized
          getScoreCallback(cloudStorage, setScore);
          getFieldsCallback(cloudStorage, setFields, setDataLoaded)
        };
    
        fetchData();
      
      } catch (e) {
        setDataLoaded(true)
      }
    }else{
      setDataLoaded(true)
    }
  }, [cloudStorage]);

  //Used to make loading page displayed for at least 3s
  useEffect(() => {
    const delayPromise = new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    delayPromise.then(() => {
      setTimeoutExpired(true)
    });
  }, []);

  //Disable loading page if 3s elapsed and data retrieval succeded
  useEffect(() => {
    if (dataLoaded && timeoutExpired) {
      setLoading(false);
    }
  }, [dataLoaded, timeoutExpired]);

  const handleAddClick = () => {
    setCurrentPage(2); //Navigate to Task page
  };

  return (
    <>
    {!loading &&
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundImage: 'url(img/mainBg.png)' }}>
      <div className='App-common-header'>
        <h1 className='main-title' style={{width: '40%', justifySelf: 'flex-end', marginLeft: '10px'}}>PLANT</h1>
        <div style={{width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '10px'}}>
          <div className='main-balance'>
            <img className='main-balance-icon' src={moneyImg} alt={"coin"} />
            <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
          </div>
          <div className='main-coins'>
            <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}>{score}</span>
            <img className='main-add-icon' onClick={handleAddClick} src={addImg} alt={"add"} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', height: '100%'}}>
        <MainContent page={currentPage} setCurrentPage={setCurrentPage} score={score} setScore={setScore} fields={fields} setFields={setFields} cs={cloudStorage}/>
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