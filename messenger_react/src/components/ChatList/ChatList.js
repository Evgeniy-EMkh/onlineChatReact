import './ChatList.style.css';
import { Link, Outlet } from 'react-router-dom';
import { Form } from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats } from '../../store/chats/selectors';
import { addChat, deleteChat } from '../../store/chats/actions';
import { clearMessages, initMessagesForChat } from '../../store/messages/actions';


export const ChatList = () => {
    const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const handleSubmit = (newChatName) => {
        const newChat = {
            name: newChatName,
            id: `chat-${Date.now()}`,
        };

        dispatch(addChat(newChat));
        dispatch(initMessagesForChat(newChat.id));
    };

    const handleRemoveChat = (id) => {
        dispatch(deleteChat(id));
        dispatch(clearMessages(id));
    };

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