import './ChatList.style.css';
import { Link, Outlet } from 'react-router-dom';
import { Form } from '../Form/Form';


export const ChatList = ({ chats, addChat, deleteChat }) => {

    const handleSubmit = (newChatName) => {
        const newChat = {
            name: newChatName,
            id: `chat-${Date.now()}`
        };

        addChat(newChat);
    };

    return (
        <>
            <div className='chatList'>
                {chats.map((e) => (
                    <div key={e.id}>
                        <Link to={`/chat/${e.id}`} >
                            {e.name}
                        </Link>
                        <span onClick={() => deleteChat(e.id)}>Delete Chat</span>
                    </div>
                ))}
            </div>
            <Form onSubmit={handleSubmit} />
            <Outlet />
        </>
    );
};