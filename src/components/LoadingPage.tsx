import { ClockLoader } from 'react-spinners'
import './../App.css'

const LoadingPage = () => {
    return(
        <div className="Loading-component">
          <h1 className="Loading-title">PLANTS</h1>
          <div className="Loading-content">
            <p>Plant tokens, embrace nature</p>
            <ClockLoader 
              loading
              size={60}
              color="white"
            />
          </div>
        </div>
    );
}

export default LoadingPage;