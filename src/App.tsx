import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import LoadingPage from './components/LoadingPage';
import { getAppleScoreCallback, getClaimableCallback, getFieldsCallback, getFriendListCallback, getLastAccessDateCallback, getPlantedVegetablesCallback, getPlantHourlyIncomeCallback, getPlantScoreCallback, getPoolStatusCallback, getRegisteredCallback, getScoreCallback, getTasksCallback, setClaimableCallback, setLastAccessDateCallback, setPlantScoreCallback, setRegisteredCallback, setScoreCallback, setTasksCallback } from './db/cloudStorageFunctions';
import { Field } from './interfaces/Field';
import addImg from './img/mainPage/add.png'
import moneyImg from './img/shopItems/dollar.png'
import appleImg from './img/shopItems/apple.png'
import { loadAssets } from './db/loadImages';
import InitialTutorial from './components/InitialTutorial';
import { addUser } from './db/firebaseConfig';
import { Friend } from './interfaces/Friend';
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import React from 'react';
import { RiPlantFill } from "react-icons/ri";
import NumberTicker from './components/utils/NumberTicker';
import DesktopPage from './components/DesktopPage';


declare global {
  interface Window {
      Telegram:any;
  }

}

type NotificationPlacement = NotificationArgsProps['placement'];
const Context = React.createContext({ name: 'Default' });

function App() {
  const [user, setUser] = useState<WebAppUser>()
  const [cloudStorage, setCloudStorage] = useState<CloudStorage | null>(null)
  const [currentPage, setCurrentPage] = useState(0); //Used to track the active tab
  const [loading, setLoading] = useState(true) //Used to display Loading page
  const [registered, setRegistered] = useState(0) //Used to see if it was the first access

  //Application data states
  const [score, setScore] = useState(0);
  const [appleScore, setAppleScore] = useState(0)
  const [plantScore, setPlantScore] = useState(0)
  const [plantHourlyIncome, setPlantHourlyIncome] = useState(0)
  const [fields, setFields] = useState<Field[]>([])
  const [tasks, setTasks] = useState<boolean[]>([])
  const [claimableTasks, setClaimableTasks] = useState<boolean[]>([])
  const [plantedVegetables, setPlantedVegetables] = useState<Map<string, number>>(new Map<string, number>())
  const [poolStatus, setPoolStatus] = useState<Map<string, boolean>>(new Map<string, boolean>())
  const [firestoreFriendList, setFirestoreFriendList] = useState<Friend[]>([])
  const [dailyStreak, setDailyStreak] = useState<number>(0)

  //Used to understand which of the two tasks finishes before (3s timeout or data loading)
  const [dataLoaded, setDataLoaded] = useState(false); //Set to true when data loaded
  const [timeoutExpired, setTimeoutExpired] = useState(false); //Set to true when timeout expired
  const [imagesLoaded, setImagesLoaded] = useState(false); //Set true when assets have been loaded

  //Used to update the plant balance
  const [lastAccessDate, setLastAccessDate] = useState<Date>()
  const contextValue = useMemo(() => ({ name: 'Plant Token' }), []);
  const [api, contextHolder] = notification.useNotification();
  const alreadyOpenedRef = useRef(false);

  //Shop tab
  const [activeTab, setActiveTab] = useState(0);
  const [addClicked, setAddClicked] = useState(false)
 


  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand()

    //window.Telegram.WebApp.enableClosingConfirmation()
    window.Telegram.WebApp.disableVerticalSwipes()

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
          getFriendListCallback(cloudStorage,  window.Telegram.WebApp.initDataUnsafe.user.id, setFirestoreFriendList)
          getAppleScoreCallback(cloudStorage, setAppleScore)
          getPlantScoreCallback(cloudStorage, setPlantScore)
          getLastAccessDateCallback(cloudStorage, setLastAccessDate)
          getPlantHourlyIncomeCallback(cloudStorage, setPlantHourlyIncome)
          getPoolStatusCallback(cloudStorage, setPoolStatus)
          getScoreCallback(cloudStorage, setScore);
          getTasksCallback(cloudStorage, setTasks, setDailyStreak);
          getClaimableCallback(cloudStorage, setClaimableTasks)
          getPlantedVegetablesCallback(cloudStorage, setPlantedVegetables)
          getFieldsCallback(cloudStorage, setFields, setDataLoaded);
          /*loadAssets(() => {
            setImagesLoaded(true);
          })*/
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
          var success = false
          if(window.Telegram.WebApp.initDataUnsafe.start_param !== undefined){
            success = await addUser(user.id.toString(), user.first_name, window.Telegram.WebApp.initDataUnsafe.start_param);
          }else{
            success = await addUser(user.id.toString(), user.first_name, "");
          }
          

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

  const updatePlantBalance = () => {
    if(lastAccessDate !== undefined){
      var actualDate : Date = new Date()
      setLastAccessDateCallback(cloudStorage, actualDate)
      var elapsed : number = actualDate.getTime() - lastAccessDate.getTime();
      elapsed = elapsed / (1000 * 60 * 60); // Convert milliseconds to hours
      elapsed = Math.min(elapsed, 4); // Ensure elapsed is at most 4 hours
      if(!alreadyOpenedRef.current && (plantHourlyIncome*elapsed) > 0){
        openNotification('topRight', (plantHourlyIncome*elapsed))
        alreadyOpenedRef.current = true; // Update ref
      }
      if (typeof elapsed !== 'number' || isNaN(elapsed) || elapsed < 0) {
        elapsed = 0
      }
      var newPlantScore = plantScore + (plantHourlyIncome*elapsed)
      setPlantScore(newPlantScore)
      setPlantScoreCallback(cloudStorage, newPlantScore)
    }
  }

  const openNotification = (placement: NotificationPlacement, points: number) => {
    api.info({
      message: `Welcome back`,
      description: <Context.Consumer>{() => `You farmed ${points.toFixed(2)} $PLANT`}</Context.Consumer>,
      placement,
      className: 'earning-popup',
      icon: <RiPlantFill />,
    });
  };

  //Disable loading page if 3s elapsed and data retrieval succeded
  useEffect(() => {
    if (dataLoaded && timeoutExpired) {
      updatePlantBalance()
      setLoading(false);
      const interval = setInterval(() => {
        updatePlantBalance()
      }, 10000);
    
      return () => clearInterval(interval);
    }
  }, [dataLoaded, timeoutExpired]);

  const handleAddClick = () => {
    setCurrentPage(3); //Navigate to Task page
  };

  const handleAddAppleClick = () => {
    setAddClicked(true) //Signal navigation from button
    setCurrentPage(1); //Navigate to Shop page
    setActiveTab(2) //Apple shop tab
  };

  return (
    <>
    {!(window.Telegram.WebApp.platform === 'android' || window.Telegram.WebApp.platform === 'android_x' || window.Telegram.WebApp.platform === 'ios') && <DesktopPage />}
    {(window.Telegram.WebApp.platform === 'android' || window.Telegram.WebApp.platform === 'android_x' || window.Telegram.WebApp.platform === 'ios') && <Context.Provider value={contextValue}>
      {contextHolder}
    {!loading && (registered !== 2) && <InitialTutorial setRegistered={setRegistered}/>}
    {!loading && (registered === 2) &&
    <div className='min-height-css' style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundImage: 'url(img/mainBg.png)' }}>
      {currentPage !== 2 && <div className='App-common-header'>
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px'}}>
          <div className='main-balance'>
            <img className='main-balance-icon' src={appleImg} alt={"apple"} />
            <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
          </div>
          <div className='main-coins'>
            <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}><NumberTicker value={appleScore} /></span>
            <img className='main-add-icon' onClick={handleAddAppleClick} src={addImg} alt={"add"} />
          </div>
        </div>
        <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '10px'}}>
          <div className='main-balance' style={{alignItems: 'flex-start'}}>
            <img className='main-balance-icon' src={moneyImg} alt={"coin"} />
            <span className='main-balance-text' style={{ fontFamily: 'Jura, sans-serif' }}>Balance:</span>
          </div>
          <div className='main-coins'>
            <span className='main-coins-text' style={{ fontFamily: 'Jura, sans-serif' }}><NumberTicker value={score} /></span>
            <img className='main-add-icon' onClick={handleAddClick} src={addImg} alt={"add"} />
          </div>
        </div>
      </div>}
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', justifyContent: 'center' }}>
        <MainContent dailyStreak={dailyStreak} activeTab={activeTab} setActiveTab={setActiveTab} addClicked={addClicked} setAddClicked={setAddClicked} page={currentPage} setCurrentPage={setCurrentPage} score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} plantScore={plantScore} setPlantScore={setPlantScore} fields={fields} setFields={setFields} tasks={tasks} setTasks={setTasks} claimableTasks={claimableTasks} setClaimableTasks={setClaimableTasks} cs={cloudStorage} plantedVegetables={plantedVegetables} setPlantedVegetables={setPlantedVegetables} poolStatus={poolStatus} setPoolStatus={setPoolStatus} friendList={firestoreFriendList} setFriendList={setFirestoreFriendList} plantHourlyIncome={plantHourlyIncome} setPlantHourlyIncome={setPlantHourlyIncome}/>
      </div>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} tasks={tasks}/>
    </div>
    }   
    {loading &&
    <LoadingPage />
    }
    </Context.Provider>}
    </>
  );
}

export default App;