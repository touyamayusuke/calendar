import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./routes/SignUp";
import Calendar from "./routes/Calendar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="calendar" element={<Calendar/>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
