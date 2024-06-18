import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { WebAppUser } from '../../interfaces/telegramInterfaces';

interface WalletTabProps {
    user: WebAppUser | null;
}

const WalletTab: React.FC<WalletTabProps> = ({ user }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Connect wallet</h1>
        <TonConnectButton />
      </header>
    </div>
  );
};

export default WalletTab;
