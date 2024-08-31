import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const manifestUrl = 'https://plant-3uf.pages.dev/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
