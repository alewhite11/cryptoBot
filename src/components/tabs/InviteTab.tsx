import React, { useState } from 'react';
import tokenCoinImg from './../../img/invitePage/tokenCoin.png'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Friend } from './../../interfaces/Friend'
import { SlPresent } from "react-icons/sl";
import { ScratchCardContent } from '../../interfaces/ScratchCardContent';
import { inviteScratchcards } from '../../db/scratchcards';
import { CircularProgress } from '@mui/material';
import { CloudStorage } from '../../interfaces/telegramInterfaces';
import { setAppleScoreCallback, setScoreCallback, updateFriendListCallback } from '../../db/cloudStorageFunctions';
import { ScratchCard } from '../utils/ScratchCard';
import scratchCardImg from './../../img/scratchcard/cardToScratch.jpg'
import moneyImg from './../../img/shopItems/dollar.png'
import appleImg from './../../img/shopItems/apple.png'

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
  const [showScratchcard, setShowScratchcard] = useState(false)
  const [foundScratchcard, setFoundScratchcard] = useState<ScratchCardContent>(inviteScratchcards[0])
  
  const handleInviteClick = () => {
    window.location.href = 'https://t.me/share/url?url=https://t.me/plant_token_bot/Plant?startapp=' + window.Telegram.WebApp.initDataUnsafe.user.id
  };

  return (
    <>
    {showScratchcard && <ScratchCardItem setShowScratchcard={setShowScratchcard} foundScratchcard={foundScratchcard}/>}
    {!showScratchcard && <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div>
        <div className='invite-page'>
          <div className='invite-dialog'>
            <h2 className='invite-title'>Invite friends</h2>
            <p className='invite-text'>For each friend that join and unlocks the spinach vegetable, you will get a chest with random apple prize</p>
            <button className='invite-btn' onClick={handleInviteClick}>Invite</button>
          </div>
          <div className='friend-list'> 
            <p className='invite-warning'>Friend list is updated once a day</p>
            <div className='total-friends'>
              <p className='invite-text-completed'>Claimed friends:</p>
              <p className='invite-text'>{activeFriends}/{totalFriends}</p>
            </div>
            <div className='friend-list-inner'>
              {friendList.slice().sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1)).map((item, key) => (
                <FriendItem item={item} name={item.name} isActive={item.isActive} userId={item.id} friendList={friendList} setFriendList={setFriendList} cs={cs}score={score} setScore={setScore} appleScore={appleScore} setAppleScore={setAppleScore} setShowScratchcard={setShowScratchcard} setFoundScratchcard={setFoundScratchcard}/>
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
  item: Friend;
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
  setShowScratchcard: (show: boolean) => void;
  setFoundScratchcard: (scratchcard: ScratchCardContent) => void;
}

const FriendItem: React.FC<FriendItemProps> = ({ item, name, isActive, userId, friendList, setFriendList, cs, score, setScore, appleScore, setAppleScore, setShowScratchcard, setFoundScratchcard }) => { 

  const onClaimClick = () => {
    updateFriendListCallback(cs, userId)
    var x = getRandomNumber(1,10000)
    var foundChest = inviteScratchcards.find(card => x >= card.minProb && x <= card.maxProb);
    setFoundScratchcard(foundChest!!)
    setShowScratchcard(true)
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

interface ScratchCardItemProps {
  setShowScratchcard: (operator: boolean) => void;
  foundScratchcard: ScratchCardContent;
}

const ScratchCardItem: React.FC<ScratchCardItemProps> = ({ setShowScratchcard, foundScratchcard }) => {

  return(
  <div className='scratchcard-container'>
      <ScratchCard
        imageSrc={scratchCardImg}
        data={foundScratchcard.score > 0 ? 
          <div className='scratch-prize'>
            <p className='scratch-text'>You won {foundScratchcard.score} </p>
            <img className='task-money-icon' src={moneyImg} alt={"money"}/>
          </div> 
          :  
          <div className='scratch-prize'>
            <p className='scratch-text'>You won {foundScratchcard.appleScore} </p>
            <img className='task-money-icon' src={appleImg} alt={"apple"}/>
          </div>}       
        handleCoverScratched={() => {
          setShowScratchcard(false);
        }}
      />
  </div>
  );
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
export default InviteTab;