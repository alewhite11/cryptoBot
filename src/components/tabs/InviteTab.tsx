import React, { useState } from 'react';
import tokenCoinImg from './../../img/invitePage/tokenCoin.png'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Friend } from './../../interfaces/Friend'
import { SlPresent } from "react-icons/sl";
import { Chest } from '../../interfaces/Chest';
import { inviteChests } from '../../db/chests';
import { CircularProgress } from '@mui/material';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { setAppleScoreCallback, setScoreCallback, updateFriendListCallback } from '../../db/cloudStorageFunctions';
import chestImg from './../../img/chests/closed_Chest.jpg'
import chestOpening from './../../video/chest_opening/generalChestOpening.mp4'

interface InviteTabProps {
  friendList : Friend[];
  setFriendList: (list : Friend[]) => void;
  cs: CloudStorage | null;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
}

const InviteTab: React.FC<InviteTabProps> = ({ friendList, setFriendList, cs, score, setScore, appleScore, setAppleScore }) => {
  const totalFriends = friendList.length;
  const activeFriends = friendList.filter(f => f.isActive).length;
  const [showChest, setShowChest] = useState(false)
  const [foundChest, setFoundChest] = useState<Chest>(inviteChests[0])

  const handleInviteClick = () => {
    window.location.href = 'https://t.me/share/url?url=https://t.me/plant_token_bot/Plant?startapp=' + window.Telegram.WebApp.initDataUnsafe.user.id
  };

  return (
    <>
    {showChest && <ChestItem setShowChest={setShowChest} foundChest={foundChest}/>}
    {!showChest && <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div>
        <div className='invite-page'>
          <div className='invite-dialog'>
            <h2 className='invite-title'>Invite friends</h2>
            <p className='invite-text'>For each friend that join and unlocks the spinach vegetable, you will get a chest with random prize</p>
            <button className='invite-btn' onClick={handleInviteClick}>Invite</button>
          </div>
          <div className='friend-list'> 
            <p className='invite-warning'>Friend list is updated once a day</p>
            <div className='total-friends'>
              <p className='invite-text-completed'>Completed friends:</p>
              <p className='invite-text'>{activeFriends}/{totalFriends}</p>
            </div>
            <div className='friend-list-inner'>
              {friendList.slice().sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1)).map((item, key) => (
                <FriendItem name={item.name} isActive={item.isActive} userId={item.id} friendList={friendList} setFriendList={setFriendList} cs={cs}score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} setShowChest={setShowChest} setFoundChest={setFoundChest}/>
              ))}
            </div> 
          </div>
        </div> 
      </header>
    </div>}
    </>
  );
};

interface FriendItemProps {
  name: string;
  isActive: boolean;
  userId: string;
  friendList : Friend[];
  setFriendList: (list : Friend[]) => void;
  cs: CloudStorage | null;
  score: number;
  setScore: (score: number) => void;
  appleScore: number;
  setAppleScore: (score: number) => void;
  setShowChest: (val : boolean) => void;
  setFoundChest: (val: Chest) => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, isActive, userId, friendList, setFriendList, cs, score, setScore, appleScore, setAppleScore, setShowChest, setFoundChest }) => {
  

  const onClaimClick = () => {
    updateFriendListCallback(cs, userId)
    var x = getRandomNumber(1,10000)
    var foundChest = inviteChests.find(chest => x >= chest.minProb && x <= chest.maxProb);
    setFoundChest(foundChest!!)
    setShowChest(true)
    setScoreCallback(cs, score + foundChest!!.score)
    setScore(score + foundChest!!.score)
    setAppleScoreCallback(cs, appleScore + foundChest!!.appleScore)
    setAppleScore(appleScore + foundChest!!.appleScore)
    const updateFriendList = [...friendList]
    const friendIndex = updateFriendList.findIndex(f => f.id === userId);
    if (friendIndex !== -1) {
      updateFriendList[friendIndex].isActive = true;
      setFriendList(updateFriendList)
    }
  }
  return(
    <div className='friend-item'>
      <div className='friend-image'>
        <img src={tokenCoinImg} alt={"friend"}/>
      </div>
      <div className='friend-name'>
        <p>{name}</p>
      </div>
      <div className='friend-status'>
        {!isActive && (<>
          <button className='claim-btn' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onClick={onClaimClick}><SlPresent size={20} color="inherit"/></button>
        </>)}
        {isActive && (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <CheckCircleOutlineIcon className='invite-text-shadow' />
        </div>)}
      </div>
    </div>
  );
}

interface ChestItemProps {
  setShowChest: (operator: boolean) => void;
  foundChest: Chest;
}

export const ChestItem: React.FC<ChestItemProps> = ({ setShowChest, foundChest }) => {
  const [imageClicked, setImageClicked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);


  const videoClicked = () => {
    setShowChest(false);
  };

  return (
    <div className='chest-container'>
      {!imageClicked &&(
        <div className='chest-img'>
          <img className='chest-img' src={chestImg} alt="chest" onClick={() => setImageClicked(true)}/>
        </div>
      )}
      {imageClicked && !videoLoaded &&(
        <div className='chest-img'>
          <img className='chest-img' style={{zIndex: '10003'}} src={chestImg} alt="chest" />
        </div>
      )}
      {imageClicked && !videoEnded &&(
        <div className='chest-vid'>
          <video className='chest-video' style={{zIndex: '10002'}} src={chestOpening} onCanPlay={() => setVideoLoaded(true)} onEnded={() => setVideoEnded(true)} autoPlay muted/>
        </div>
      )}
      {imageClicked &&(
        <div className='chest-img'>
          <img className='chest-img' style={{zIndex: '10000'}} src={foundChest.image} onClick={videoClicked} alt="chest" />
        </div>
      )}
    </div>
  );
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export default InviteTab;