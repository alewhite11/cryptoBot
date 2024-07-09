import React from 'react';
import tokenCoinImg from './../../img/invitePage/tokenCoin.png'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const friendList = [
  {name: "Adam", pending: true},
  {name: "Berry", pending: false},
  {name: "Erica", pending: true},
  {name: "Adam", pending: true},
  {name: "Berry", pending: false},
  {name: "Erica", pending: true}
]

interface InviteTabProps {
    
}

const InviteTab: React.FC<InviteTabProps> = ({  }) => {
  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div>
        <div className='invite-page'>
          <div className='invite-dialog'>
            <p className='invite-title'>Invite friends</p>
            <p className='invite-text'>For each friend that join and unlocks the spinach vegetable, you will get 500 coins</p>
            <button className='invite-btn'>Invite</button>
            <p className='invite-warning'>Friend list is updated once a day</p>
          </div>
          <div className='friend-list'>  
            {friendList.map((item, key) => (
              <Friend name={item.name} pending={item.pending} />
            ))}
          </div>
        </div> 
      </header>
    </div>
  );
};

interface FriendProps {
  name: string;
  pending: boolean;
}

const Friend: React.FC<FriendProps> = ({ name, pending }) => {
  return(
    <div className='friend-item'>
      <div className='friend-image'>
        <img src={tokenCoinImg} alt={"friend"}/>
      </div>
      <div className='friend-name'>
        <p>{name}</p>
      </div>
      <div className='friend-status'>
        {pending && (<>
          <QueryBuilderIcon />
          <p style={{fontSize: 'small'}}>Pending...</p>
        </>)}
        {!pending && (<>
          <CheckCircleOutlineIcon style={{color: 'white'}} />
          <p style={{fontSize: 'small'}}>Completed</p>
        </>)}
      </div>
    </div>
  );
}
  
  export default InviteTab;