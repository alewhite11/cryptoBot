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
            if (newValue === 3) {
              setShowBadge(false);
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
            borderRadius: '16px',
            boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#219345',
            zIndex: 500,
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0', // Increase padding for touch targets
            '@media (max-width: 600px)': {
              // Adjustments for small screens
              padding: '5px 0',
              '&& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem', // Smaller label text
              },
              '&& .MuiBottomNavigationAction-root': {
                minWidth: 0, // Allow buttons to be smaller
                padding: '0 4px', // Reduced padding between items
              },
            },
            "&& .Mui-selected": {
              backgroundColor: "#0a3d02",
              color: '#FFFFFF',
              borderRadius: '16px',
            }
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<img src={sproutIcon} alt="Home" style={{ width: '1.5em', height: '1.5em' }} />}
          />
          <BottomNavigationAction
            label="Shop"
            icon={<img src={shopIcon} alt="Shop" style={{ width: '1.5em', height: '1.5em' }} />}
          />
          <BottomNavigationAction
            label="Plant"
            icon={<img src={plantIcon} alt="Plant" style={{ width: '1.5em', height: '1.5em' }} />}
          />
          <BottomNavigationAction
            label="Earn"
            icon={showBadge ? <Badge color="error" badgeContent=" "><img src={moneyIcon} alt="Earn" style={{ width: '1.5em', height: '1.5em' }} /></Badge> : <img src={moneyIcon} alt="Earn" style={{ width: '1.5em', height: '1.5em' }} />}
          />
          <BottomNavigationAction
            label="Friends"
            icon={<img src={inviteIcon} alt="Friends" style={{ width: '1.5em', height: '1.5em' }} />}
          />
        </BottomNavigation>
      </div>
    );
  };
  
  export default BottomNav;