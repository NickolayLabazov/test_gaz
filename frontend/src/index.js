import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {  
  console.log('connected')
}

ws.onclose = () => {
  console.log('disconnected')  
}


ReactDOM.render(
  <React.StrictMode>
    <App ws={ws} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
