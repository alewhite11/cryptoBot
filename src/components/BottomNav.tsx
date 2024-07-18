import React, { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import shopIcon from './../img/buttonBar/shop.png';
import inviteIcon from './../img/buttonBar/invite.png';
import moneyIcon from './../img/buttonBar/money.png';
import sproutIcon from './../img/buttonBar/sprout.png';
import plantIcon from './../img/invitePage/tokenCoin.png'
import Badge from '@mui/material/Badge';
import { dailyTasks } from '../db/tasks';

interface BottomNavProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    tasks: boolean[];
  }
  
  const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, tasks }) => {
    const [showBadge, setShowBadge] = useState(false)

    useEffect(() => {
      dailyTasks.forEach((task) => {
        if(tasks[task.id] !== true){
          setShowBadge(true)
        }
      });
    }, []);

    return (
      <div style={{ position: 'relative', width: '100%', outline: 'none' }}>
          <BottomNavigation
            value={currentPage}
            onChange={(event, newValue) => {
            setCurrentPage(newValue);
            if(newValue === 3){
              setShowBadge(false)
            }
            }}
            showLabels
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
              marginBottom: '5px',
              borderRadius: '16px 16px 16px 16px', 
              boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#219345', 
              zIndex: 500,
              "&& .Mui-selected": {
                backgroundColor: "#0a3d02",
                color: '#FFFFFF',
                borderRadius: '16px 16px 16px 16px'
              }
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<img src={sproutIcon} alt="Home" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Shop"
              icon={<img src={shopIcon} alt="Shop" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Plant"
              icon={<img src={plantIcon} alt="Plant" style={{ width: 24, height: 24 }} />}
            />
            <BottomNavigationAction
              label="Earn"
              icon={showBadge ? <Badge color="error" badgeContent=" "><img src={moneyIcon} alt="Earn" style={{ width: 24, height: 24 }} /></Badge> : <img src={moneyIcon} alt="Earn" style={{ width: 24, height: 24 }} />}       
            />
            <BottomNavigationAction
              label="Friends"
              icon={<img src={inviteIcon} alt="Friends" style={{ width: 24, height: 24 }} />}
            />
          </BottomNavigation>
        
      </div>
    );
  };
  
  export default BottomNav;