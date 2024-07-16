import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { WebAppUser } from '../../interfaces/telegramInterfaces';

interface WalletTabProps {
    user: WebAppUser | null;
}

const WalletTab: React.FC<WalletTabProps> = ({ user }) => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  return (
    <div className="App">
      <header className="App-header">
        {/* Used to avoid content under the top bar */}
        <div style={{marginTop: '65px'}}></div>
        <h1>Connect wallet</h1>
        <TonConnectButton />
        {tonConnectUI.connected && <Settings />}
      </header>
    </div>
  );
};

const transaction = {
  messages: [
    {
      address: "UQD5Ow14GKssj8fAiq2NbyTNIftXfqq15D0S6Nf0QU15sUnQ", // destination address
      amount: "200000", // Toncoin in nanotons
      bounce: false
    }
  ],
  validUntil: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
}

export const Settings = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const handleTransaction = async () => {
    try {
      const result = await tonConnectUI.sendTransaction(transaction, {
        modals: ['before', 'success', 'error'],
        notifications: []
      });

      // Assuming `result` contains the signed BOC (blockchain object)
      // You can use signed BOC to find the transaction
      alert('Transaction was sent successfully, ' + result.boc);
    } catch (e) {
      console.error('Transaction failed:', e);
      alert('Transaction failed. Please try again: ' + e);
    }
  };

  return (
      <div>
          <button onClick={handleTransaction}>
              Send transaction
          </button>
      </div>
  );
};

export default WalletTab;
