import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// Including reportWebVitals to measure performance in this app by logging results
reportWebVitals(console.log);


//Can also use reportWebVitals to send results to google analytics:
/*
function sendToAnalytics({ id, name, value }) {
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
}

reportWebVitals(sendToAnalytics);
*/
