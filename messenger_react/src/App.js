import logo from './logo.svg';
import './App.css';
import { Message } from './components/Message/Message';
// import { Counter } from './components/Examples/Examples';
import { Form } from './components/Form/Form';
import { useState } from 'react';

const name = 'Evgeniy';

const msgs = [{
  author: name,
  text: 'text1'
}, {
  author: name,
  text: 'text2'
}]

function App() {
  const [messages, setMessages] = useState(msgs);

  const addMessage = (newText) => {
    setMessages([...messages, { text: newText, author: name }])
  }

  return (
    <div className="App">
      {messages.map((msg) => (
        <Message text={msg.text} author={msg.author} />
      ))}
      <Form onSubmit={addMessage} />
    </div>
  );
}

export default App;
