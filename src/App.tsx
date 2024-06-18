import { useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clicking Game</h1>
        <button onClick={handleClick}>Click me!</button>
        <p>Score: <span>{score}</span></p>
      </header>
    </div>
  );
}

export default App;