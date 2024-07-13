import { useEffect, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import LoadingPage from './components/LoadingPage';
import { getAppleScoreCallback, getClaimableCallback, getFieldsCallback, getPlantedVegetablesCallback, getRegisteredCallback, getScoreCallback, getTasksCallback, setRegisteredCallback, setScoreCallback } from './db/cloudStorageFunctions';
import { Field } from './interfaces/Field';
import addImg from './img/mainPage/add.png'
import moneyImg from './img/shopItems/dollar.png'
import appleImg from './img/shopItems/apple.png'
import { loadAssets } from './db/loadImages';
import InitialTutorial from './components/InitialTutorial';
import { addUser } from './db/firebaseConfig';


declare global {
  interface Window {
      Telegram:any;
  }

}

function App() {
  const [user, setUser] = useState<WebAppUser>()
  const [cloudStorage, setCloudStorage] = useState<CloudStorage | null>(null)
  const [currentPage, setCurrentPage] = useState(0); //Used to track the active tab
  const [loading, setLoading] = useState(true) //Used to display Loading page
  const [registered, setRegistered] = useState(0) //Used to see if it was the first access

  //Application data states
  const [score, setScore] = useState(0);
  const [appleScore, setAppleScore] = useState(0)
  const [fields, setFields] = useState<Field[]>([])
  const [tasks, setTasks] = useState<boolean[]>([])
  const [claimableTasks, setClaimableTasks] = useState<boolean[]>([])
  const [plantedVegetables, setPlantedVegetables] = useState<Map<string, number>>(new Map<string, number>())

  //Used to understand which of the two tasks finishes before (3s timeout or data loading)
  const [dataLoaded, setDataLoaded] = useState(false); //Set to true when data loaded
  const [timeoutExpired, setTimeoutExpired] = useState(false); //Set to true when timeout expired
  const [imagesLoaded, setImagesLoaded] = useState(false); //Set true when assets have been loaded

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();

    //window.Telegram.WebApp.enableClosingConfirmation()

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
          getRegisteredCallback(cloudStorage, setRegistered)
          getAppleScoreCallback(cloudStorage, setAppleScore)
          getScoreCallback(cloudStorage, setScore);
          getTasksCallback(cloudStorage, setTasks);
          getClaimableCallback(cloudStorage, setClaimableTasks)
          getPlantedVegetablesCallback(cloudStorage, setPlantedVegetables)
          getFieldsCallback(cloudStorage, setFields, setDataLoaded);
          loadAssets(() => {
            setImagesLoaded(true);
          })
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

  //Catch the result of the user retrieval from db
  useEffect(() => {
    const registerUser = async () => {
      try {
        if (registered === 1 && user != undefined) {
          // Create user account in Firebase
          const success = await addUser(user.id.toString(), user.first_name, "");

          if(success){
            setRegisteredCallback(cloudStorage,  2)
          }
        }
      } catch (error) {
        
      }
    };
    if(registered === 1 && !loading){
      //Create user account i firebase
      registerUser();
    }
  }, [registered, loading]);

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
    {!loading && (registered !== 2) && <InitialTutorial setRegistered={setRegistered}/>}
    {!loading && (registered === 2) &&
    <div className='min-height-css' style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundImage: 'url(img/mainBg.png)' }}>
      <div className='App-common-header'>
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px'}}>
          <div className='main-balance'>
            <img className='main-balance-icon' src={appleImg} alt={"apple"} />
            <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
          </div>
          <div className='main-coins'>
            <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}>{appleScore}</span>
          </div>
        </div>
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '10px'}}>
          <div className='main-balance' style={{alignItems: 'flex-start'}}>
            <img className='main-balance-icon' src={moneyImg} alt={"coin"} />
            <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
          </div>
          <div className='main-coins'>
            <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}>{score}</span>
            <img className='main-add-icon' onClick={handleAddClick} src={addImg} alt={"add"} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', justifyContent: 'center' }}>
        <MainContent page={currentPage} setCurrentPage={setCurrentPage} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} fields={fields} setFields={setFields} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks} cs={cloudStorage} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables}/>
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