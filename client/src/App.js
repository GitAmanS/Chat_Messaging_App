import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ChatPage from './components/chats/ChatPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <BrowserRouter>
    <Routes>
      
        
          <Route path="/signup" element={<SignUpForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/chats" element={<ChatPage/>}/>
        
      
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
