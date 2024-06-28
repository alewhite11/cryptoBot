import React from 'react';

interface InviteTabProps {
    
}

const InviteTab: React.FC<InviteTabProps> = ({  }) => {
    return (
      <div className="App">
        <header className="App-header">
          {/* Used to avoid content under the top bar */}
          <div style={{marginTop: '65px'}}></div> 
          <h1 className='title'>Invite:</h1>
        </header>
      </div>
    );
  };
  
  export default InviteTab;