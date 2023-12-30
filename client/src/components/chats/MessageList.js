// MessageList.js
import React from 'react';


function MessageList({ messages }) {
  return (
    <div className="">
      {messages.map((message) => (
        <div key={message.id} className="chat chat-end">
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">{message.message}</div>
          <div className="chat-footer opacity-50">
            {message.status === 'seen' ? 'Seen' : 'Delivered'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
