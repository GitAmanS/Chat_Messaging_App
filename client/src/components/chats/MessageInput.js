import React, { useState } from 'react';
import axios from 'axios';

function MessageInput({ onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = async () => {
    
      try {
        // Retrieve the user token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('User token not found in localStorage');
          return;
        }

        console.log(inputText);
        // Send the message and token to the server using Axios
        const response = await axios.post(
          'http://localhost:5000/api/chat/add',
          { message: inputText },
          { headers: { Authorization: token } }
        );

        // Assuming the server responds with data, you can handle it as needed
        console.log('Server response:', response.data);

        // Call onSendMessage with the message if needed
        onSendMessage(inputText);

        // Clear the input
        setInputText('');
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    
  };

  return (
    <div>
      <input
        className="input input-bordered input-sm w-full max-w-xs"
        type="text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="btn btn-sm mt-1" onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;
