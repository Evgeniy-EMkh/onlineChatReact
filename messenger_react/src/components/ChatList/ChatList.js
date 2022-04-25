import './ChatList.style.css';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';

const chatList = [{ name: 'Chat1', id: 'chat1', },
{ name: 'Chat2', id: 'chat2', },
{ name: 'Chat3', id: 'chat3', }];

export const ChatList = () => (
    <>
        <div className='chatList'>
            {chatList.map((e) => (
                <Link to={`/chat/${e.id}`} key={e.id}>
                    {e.name}
                </Link>
            ))}
        </div>
        <Outlet />
    </>
);