import { useEffect, useState } from 'react';
import './App.css';
import '@twa-dev/sdk';
import { WebAppInitData, WebAppUser,CloudStorage } from './interfaces/telegramInterfaces';

declare global {
  interface Window {
      Telegram:any;
  }

}

function App() {
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<WebAppUser | null>(null)
  const [cloudStorage, setCloudStorage] = useState<CloudStorage | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();

    const webappinit: WebAppInitData = window.Telegram.WebApp.initDataUnsafe;
    const u: WebAppUser | undefined = webappinit.user;

    if (u != undefined) {
      setUser(u);
    }

    const cs: CloudStorage = window.Telegram.WebApp.CloudStorage;
    setCloudStorage(cs);
  }, []);

  useEffect(() => {
    if (cloudStorage) {
      try {
        cloudStorage.getItem("score", (error, value) => {
          if (error) {
            setMessage("Error: " + error);
          } else {
            setMessage("RETRIEVE SCORE: " + value);
            if (value !== undefined && !isNaN(parseInt(value, 10))) {
              setMessage("Setting SCORE to " + value);
              setScore(parseInt(value, 10));
            }
          }
        });
      } catch (e) {
        setMessage("" + e);
      }
    }
  }, [cloudStorage]);

  const handleClick = () => {
    setScore(prevScore => {
      const newScore = prevScore + 1;
      cloudStorage?.setItem("score", newScore.toString(), (error: any, stored: boolean) => {
        if (error) {
          setMessage("Error setting score: " + error);
        } else if (stored) {
          setMessage("Score set successfully to " + newScore);
        }
      });
      return newScore;
    });
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>Clicking Game</h1>

        <p>Hi {user?.first_name ? user.first_name : 'Guest'}, welcome to our clicking game</p>
        <button onClick={handleClick}>Click me!</button>
        <p>Score: <span>{score}</span></p>
        <p>Message: <span>{message}</span></p>
      </header>
    </div>
  );
}

export default App;