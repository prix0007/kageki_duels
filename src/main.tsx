import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@radix-ui/themes/styles.css';
import './index.css'
import { Theme } from '@radix-ui/themes';

import "@fontsource/permanent-marker/400.css"; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor='orange'>
      <App />
    </Theme>
  </React.StrictMode>,
)
