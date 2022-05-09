import './App.css';
import { Chat } from './components/screens/Chat/Chat';
import { Profile } from './components/screens/Profile/Profile';
import { ChatList } from './components/ChatList/ChatList';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Home } from './components/screens/Home/Home';
import { Articles } from './components/screens/Articles/Articles';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { useEffect, useState } from 'react';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

function App() {

  const [authed, setAuthed] = useState(false);
  const handleLogin = () => {
    setAuthed(true);
  };
  const handleLogout = () => {
    setAuthed(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin();
      } else {
        handleLogout();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
        <li>
          <NavLink to='/chat'>Chat</NavLink>
        </li>
        <li>
          <NavLink to='/articles'>Articles</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<PublicRoute auhted={authed} />}>
          <Route path='' element={<Home onAuth={handleLogin} />} />
          <Route path="signup"
            element={<Home onAuth={handleLogin} isSignUp />}
          />
        </Route>

        <Route path='/profile' element={<PrivateRoute auhted={authed} />}>
          <Route path="" element={<Profile onLogout={handleLogout} />} />
        </Route>

        <Route path='/articles' element={<Articles />} />
        <Route path='/chat' element={<ChatList />}>
          <Route path=':id' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};


export default App;
