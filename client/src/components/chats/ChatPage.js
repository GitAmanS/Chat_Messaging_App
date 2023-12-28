// ChatPage.js
import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatPage() {
  const [messages, setMessages] = useState([]);


  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, id: messages.length, status: 'delivered' }]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="artboard phone-2 border overflow-auto " >
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
