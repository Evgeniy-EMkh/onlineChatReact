import './App.css';
import { Chat } from './components/screens/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { ChatList } from './components/ChatList/ChatList';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { Home } from './components/Home/Home';
import { useState } from 'react';
import { addChat, deleteChat } from './store/chats/actions';
import { selectChats } from './store/chats/selectors';

const initialChats = [{ name: 'Chat1', id: 'chat1', },
{ name: 'Chat2', id: 'chat2', },
{ name: 'Chat3', id: 'chat3', }];

const initMessages = initialChats.reduce((acc, chat) => {
  acc[chat.id] = [];
  return acc;
}, {});

function App() {

  // const [chats, setChats] = useState(initialChats);

  const chats = useSelector(selectChats, shallowEqual);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(initMessages);

  const addMessage = (newMsg, id) => {
    setMessages({ ...messages, [id]: [...messages[id], newMsg] });
  };

  const addNewChat = (newChat) => {
    dispatch(addChat(newChat));
    setMessages((prevMessages) => ({ ...prevMessages, [newChat.id]: [] }));
  };

  const removeChat = (id) => {
    dispatch(deleteChat(id));
    setMessages(prevMessages => {
      const newMessages = { ...prevMessages };
      delete newMessages[id];

      return newMessages;
    });
  };


  return (
    <BrowserRouter>
      <ul>
        <li>
          <NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'FireBrick' : 'blue' })}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/profile' style={({ isActive }) => ({ color: isActive ? 'FireBrick' : 'blue' })}>Profile</NavLink>
        </li>
        <li>
          <NavLink to='/chat' style={({ isActive }) => ({ color: isActive ? 'FireBrick' : 'blue' })}>Chat</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/chat' element={<ChatList chats={chats} addChat={addNewChat} deleteChat={removeChat} />}>
          <Route path=':id' element={<Chat messages={messages} addMessage={addMessage} />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};


export default App;
