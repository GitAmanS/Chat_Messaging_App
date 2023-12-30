import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const pendingMessageRef = useRef(null);

  useEffect(() => {
    // Fetch messages from the server when the component mounts
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('User token not found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/chat/getMessages', {
          headers: { Authorization: token },
        });

        // Update the messages state with the retrieved messages
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();

    // Set up an interval to fetch messages periodically (every 1000 milliseconds)
    const intervalId = setInterval(fetchMessages, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleSendMessage = async (messageText) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User token not found in localStorage');
        return;
      }

      // Create a temporary message with "pending" status and a unique id
      // const newPendingMessage = {
      //   message: messageText,
      //   id: Date.now(),
      //   status: 'pending',
      // };

      // Update the messages state with the temporary "pending" message
      // setMessages((prevMessages) => [...prevMessages, newPendingMessage]);

      // Save the reference to the pending message for the finally block
      // pendingMessageRef.current = newPendingMessage;

      // Send the message and token to the server using Axios
      const response = await axios.post(
        'http://localhost:5000/api/chat/add',
        { message: messageText },
        { headers: { Authorization: token } }
      );

      // Assuming the server responds with data, you can handle it as needed
      console.log('Server response:', response.data);

      // Update the messages state with the new message and set status to 'delivered'
      // setMessages((prevMessages) =>
      //   prevMessages.map((msg) =>
      //     msg.id === pendingMessageRef.current.id ? { ...msg, status: 'delivered' } : msg
      //   )
      // );
    } catch (error) {
      console.error('Error sending message:', error.message);

      // If there's an error, update the status of the pending message to 'failed'
      // setMessages((prevMessages) =>
      //   prevMessages.map((msg) =>
      //     msg.id === pendingMessageRef.current.id ? { ...msg, status: 'failed' } : msg
      //   )
      // );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="artboard phone-2 border overflow-auto">
        {/* Set a fixed height or max-height for the chat box */}
        <h1>Chat with Obi-Wan Kenobi</h1>
        <MessageList messages={messages} />
      </div>
      <div className="mt-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
