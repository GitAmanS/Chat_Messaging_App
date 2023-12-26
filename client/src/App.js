// src/App.js

import React from 'react';
import SignUpForm from './components/SignUpForm';

function App() {
  const handleSignUp = (formData) => {
    // Handle form submission logic specific to the parent component
    console.log('Handling form submission in the parent component:', formData);
  };

  return (
    <div className="App">
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
}

export default App;
