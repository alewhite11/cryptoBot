import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface BottomNavProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }
  
  const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
    return (
      <div className="App">
        
          <BottomNavigation
            value={currentPage}
            onChange={(event, newValue) => {
            setCurrentPage(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Farm" icon={<LocalFloristIcon />} />
            <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
            <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
          </BottomNavigation>
        
      </div>
    );
  };
  
  export default BottomNav;