import './App.css';
import { Chat } from './components/screens/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { ChatList } from './components/ChatList/ChatList';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Home } from './components/Home/Home';

function App() {

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
        <Route path='/chat' element={<ChatList />}>
          <Route path=':id' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};


export default App;
