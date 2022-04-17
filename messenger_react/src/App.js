import './App.css';
import { MessageList } from './components/MessageList/MessageList';
import { Form } from './components/Form/Form';
import { Chat } from './components/Chat/Chat';
import { useEffect, useState } from 'react';
import { AUTHORS, Constants } from './utils/Constants';


function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (newText) => {
    setMessages([...messages, { text: newText, author: AUTHORS.human, id: `msg-${Date.now()}` }]);
  };

  useEffect(() => {
    let timeout;
    if (messages.length && messages[messages.length - 1].author === AUTHORS.human) {
      timeout = setTimeout(() => {
        setMessages([...messages, { text: ' the message has been sent', author: AUTHORS.robot, id: `msg-${Date.now()}` }]);
      }, 1000);
    };

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  return (
    <div>
      <Chat />
      <div className="App">
        <MessageList messages={messages} />
        <Form onSubmit={addMessage} />
      </div>
    </div>
  );
};

export default App;
