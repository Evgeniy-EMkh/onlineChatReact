import './Chat.style.css';
import { MessageList } from '../../MessageList/MessageList';
import { Form } from '../../Form/Form';
import { useEffect, useState, useRef } from 'react';
import { AUTHORS, Constants } from '../../../utils/Constants';
import { Navigate, useParams } from "react-router";

const chatList = [
    { name: 'Chat1', id: 'chat1', },
    { name: 'Chat2', id: 'chat2', },
    { name: 'Chat3', id: 'chat3', }
];

const initMessages = {
    chat1: [],
    chat2: [],
    chat3: [],
};

export function Chat() {
    const { id } = useParams();
    const [messages, setMessages] = useState(initMessages);

    const timeout = useRef();
    const wrapperRef = useRef();

    const addMessage = (newMsg) => {
        setMessages({ ...messages, [id]: [...messages[id], newMsg] });
    };

    const sendMessage = (text) => {
        addMessage({
            author: AUTHORS.human,
            text,
            id: `msg-${Date.now()}`,
        });
    };

    useEffect(() => {
        const lastMessage = messages[id]?.[messages[id]?.length - 1];
        if (lastMessage?.author === AUTHORS.human) {
            timeout.current = setTimeout(() => {
                addMessage({
                    author: AUTHORS.robot,
                    text: 'the message has been sent',
                    id: `msg-${Date.now()}`,
                });
            }, 1000);
        }

        return () => {
            clearTimeout(timeout.current);
        };
    }, [messages]);

    if (!messages[id]) {
        return <Navigate to='/chat' replace />
    }

    return (
        <div className='chat' ref={wrapperRef}>
            <div>
                <MessageList messages={messages[id]} />
                <Form onSubmit={sendMessage} />
            </div>
        </div>
    );
}
