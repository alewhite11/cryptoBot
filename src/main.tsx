import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const manifestUrl = 'https://alewhite11.github.io/cryptoBot/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
