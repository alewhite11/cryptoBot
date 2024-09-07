import { ClockLoader } from 'react-spinners'
import './../App.css'

const TimeErrorPage = () => {
    return(
        <div className="Desktop-component">
          <h1 className="Desktop-title">PLANT</h1>
          <div className="Desktop-content">
            <p style={{fontSize: 'medium'}}>Seems like your local time in the device is not correct, please adjust your timer and try reopening the game. If time is correct, please close the app and reopen it from the bot. Thank you farmer!</p>
          </div>
        </div>
    );
}

export default TimeErrorPage;