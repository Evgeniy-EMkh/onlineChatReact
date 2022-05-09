import './ChatList.style.css';
import { Link, Outlet } from 'react-router-dom';
import { Form } from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats } from '../../store/chats/selectors';
import { addChat, deleteChat } from '../../store/chats/actions';
import { clearMessages, initMessagesForChat } from '../../store/messages/actions';
import { useEffect, useState } from 'react';
import { chatsRef, getChatRefById, getMsgsRefById } from '../../services/firebase';
import { onValue, remove, set } from 'firebase/database';


export const ChatList = () => {
    const [chats, setChats] = useState([]);
    // const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const handleSubmit = (newChatName) => {
        const newChat = {
            name: newChatName,
            id: `chat-${Date.now()}`,
        };

        set(getChatRefById(newChat.id), newChat);
        set(getMsgsRefById(newChat.id), { exists: true });
    };

    const handleRemoveChat = (id) => {
        remove(getChatRefById(id));
        set(getMsgsRefById(id), null);
    };

    useEffect(() => {
        const unsubscribe = onValue(chatsRef, (snapshot) => {
            console.log(snapshot.val());
            setChats(Object.values(snapshot.val() || {}));
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <div className='chatList'>
                {chats.map((e) => (
                    <div key={e.id}>
                        <Link to={`/chat/${e.id}`} >
                            {e.name}
                        </Link>
                        <span onClick={() => handleRemoveChat(e.id)}>Delete Chat</span>
                    </div>
                ))}
            </div>
            <Form onSubmit={handleSubmit} />
            <Outlet />
        </>
    );
};