// MessageInput.js
import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = () => {
    if(!inputText){
      console.log("Input field is empty");
    }
    else if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };
  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed
    if (e.key === 'Enter') {
      // Call handleSendClick when Enter is pressed
      handleSendClick();
    }
  };
  return (
    <div>
      <input className="input input-bordered input-sm w-full max-w-xs required" type="text" value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
      <button className="btn btn-sm mt-1" onClick={handleSendClick}>Send</button>
    </div>
  );
}

export default MessageInput;
