// MessageInput.js
import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = () => {
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      <input className="input input-bordered input-sm w-full max-w-xs " type="text" value={inputText} onChange={handleInputChange} />
      <button className="btn btn-sm mt-1" onClick={handleSendClick}>Send</button>
    </div>
  );
}

export default MessageInput;
