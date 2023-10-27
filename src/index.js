import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD2BpwnwwQbqM5odRxg7Nve0TjRBgpwzd0",
  authDomain: "my-react-blog-c8298.firebaseapp.com",
  projectId: "my-react-blog-c8298",
  storageBucket: "my-react-blog-c8298.appspot.com",
  messagingSenderId: "762147316247",
  appId: "1:762147316247:web:d12c350f7fd50693aef252"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
