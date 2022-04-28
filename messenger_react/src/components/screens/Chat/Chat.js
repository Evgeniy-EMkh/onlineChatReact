import './Chat.style.css';
import { MessageList } from '../../MessageList/MessageList';
import { Form } from '../../Form/Form';
import { useEffect, useMemo, useRef } from 'react';
import { AUTHORS } from '../../../utils/Constants';
import { Navigate, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByChatId } from '../../../store/messages/selectors';
import { addMessage } from '../../../store/messages/actions';


export function Chat() {
    const { id } = useParams();
    const getMessages = useMemo(() => selectMessagesByChatId(id), [id]);
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();

    const timeout = useRef();
    const wrapperRef = useRef();

    const sendMessage = (text) => {
        dispatch(
            addMessage(
                {
                    author: AUTHORS.human,
                    text,
                    id: `msg-${Date.now()}`,
                },
                id
            )
        );
    };

    useEffect(() => {
        const lastMessage = messages?.[messages?.length - 1];
        if (lastMessage?.author === AUTHORS.human) {
            timeout.current = setTimeout(() => {
                dispatch(
                    addMessage(
                        {
                            author: AUTHORS.robot,
                            text: 'the message has been sent',
                            id: `msg-${Date.now()}`,
                        },
                        id
                    )
                );
            }, 1000);
        }

        return () => {
            clearTimeout(timeout.current);
        };
    }, [messages]);

    if (!messages) {
        return <Navigate to='/chat' replace />
    }

    return (
        <div className='chat' ref={wrapperRef}>
            <div>
                <MessageList messages={messages} />
                <Form onSubmit={sendMessage} />
            </div>
        </div>
    );
}
