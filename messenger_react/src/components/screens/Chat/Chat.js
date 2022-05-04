import './Chat.style.css';
import { MessageList } from '../../MessageList/MessageList';
import { Form } from '../../Form/Form';
import { useEffect, useMemo, useRef } from 'react';
import { AUTHORS } from '../../../utils/Constants';
import { Navigate, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByChatId } from '../../../store/messages/selectors';
import { addMessage, addMessageWithReply } from '../../../store/messages/actions';


export function Chat() {
    const { id } = useParams();
    const getMessages = useMemo(() => selectMessagesByChatId(id), [id]);
    const messages = useSelector(getMessages);
    const dispatch = useDispatch();

    const timeout = useRef();
    const wrapperRef = useRef();

    const sendMessage = (text) => {
        dispatch(
            addMessageWithReply(
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
