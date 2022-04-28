import './Chat.style.css';
import { MessageList } from '../../MessageList/MessageList';
import { Form } from '../../Form/Form';
import { useEffect, useState, useRef } from 'react';
import { AUTHORS, Constants } from '../../../utils/Constants';
import { Navigate, useParams } from "react-router";

export function Chat({ messages, addMessage }) {
    const { id } = useParams();

    const timeout = useRef();
    const wrapperRef = useRef();

    const sendMessage = (text) => {
        addMessage({
            author: AUTHORS.human,
            text,
            id: `msg-${Date.now()}`,
        },
            id
        );
    };

    useEffect(() => {
        const lastMessage = messages[id]?.[messages[id]?.length - 1];
        if (lastMessage?.author === AUTHORS.human) {
            timeout.current = setTimeout(() => {
                addMessage({
                    author: AUTHORS.robot,
                    text: 'the message has been sent',
                    id: `msg-${Date.now()}`,
                }, id);
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
