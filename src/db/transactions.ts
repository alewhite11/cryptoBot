import { TonConnectUI } from "@tonconnect/ui-react";

const plantAddress = "UQBudNvlUkEK9KEQ7g-vwvFVaKMx1eFsoWCnk4JBRF8ICl02"; 

export const handleTransaction = async (tonConnectUI: TonConnectUI, amount: string, onSuccess: () => void) => {
    const transaction = {
        messages: [
          {
            address: plantAddress, // destination address
            amount: amount, // Toncoin in nanotons
            bounce: false
          }
        ],
        validUntil: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      }

    try {
      const result = await tonConnectUI.sendTransaction(transaction, {
        modals: ['before', 'success', 'error'],
        notifications: []
      });

      //Perform the onSuccess action
      onSuccess()
    } catch (e) {
      console.error('Transaction failed:', e);
    }
  };