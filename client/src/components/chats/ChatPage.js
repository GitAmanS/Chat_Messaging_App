import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [lastMessageId, setLastMessageId] = useState(null);

  useEffect(() => {
    // Fetch messages from local storage when the component mounts
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);

    // Set up an interval to fetch new messages periodically (every 10 seconds)
    const intervalId = setInterval(fetchNewMessages, 10000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  

  const fetchNewMessages = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('User token not found in localStorage');
        return;
      }
  
      // Construct the request URL with the lastMessageId
      const url = `http://localhost:5000/api/chat/getMessages/${lastMessageId || -1}`;
  
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
  
      const newMessages = response.data.messages;
  
      // Update the messages state with the new messages
      setMessages((prevMessages) => {
        // Filter out duplicates based on message id
        const uniqueNewMessages = newMessages.filter(
          (newMsg) => !prevMessages.some((prevMsg) => prevMsg.id === newMsg.id)
        );
  
        // Concatenate the unique messages with the existing messages
        const updatedMessages = [...prevMessages, ...uniqueNewMessages];
  
        // Save only the last 10 messages in local storage
        const lastTenMessages = updatedMessages.slice(-10);
        localStorage.setItem('messages', JSON.stringify(lastTenMessages));
  
        // Update the lastMessageId for the next request
        const newLastMessageId = uniqueNewMessages.length > 0 ? uniqueNewMessages[uniqueNewMessages.length - 1].id : null;
        setLastMessageId(newLastMessageId);
  
        return lastTenMessages;
      });
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };
  

  const handleSendMessage = async (messageText) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User token not found in localStorage');
        return;
      }

      // Send the message and token to the server using Axios
      const response = await axios.post(
        'http://localhost:5000/api/chat/add',
        { message: messageText },
        { headers: { Authorization: token } }
      );

      // Assuming the server responds with data, you can handle it as needed
      console.log('Server response:', response.data);

      // Fetch new messages only when a message is successfully sent
      fetchNewMessages();
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="artboard phone-2 border overflow-auto">
        <h1>Chat Application</h1>
        <MessageList messages={messages} />
      </div>
      <div className="mt-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
