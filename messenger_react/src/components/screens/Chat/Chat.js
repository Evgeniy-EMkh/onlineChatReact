import './Chat.style.css';
import { MessageList } from '../../MessageList/MessageList';
import { Form } from '../../Form/Form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AUTHORS } from '../../../utils/Constants';
import { Navigate, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesByChatId } from '../../../store/messages/selectors';
import { addMessage, addMessageWithReply } from '../../../store/messages/actions';
import { onValue, push } from 'firebase/database';
import { auth, getMsgsListRefById, getMsgsRefById } from '../../../services/firebase';


export function Chat() {
    const { id } = useParams();

    const [messages, setMessages] = useState([]);

    const getMessages = useMemo(() => selectMessagesByChatId(id), [id]);
    // const messages = useSelector(getMessages);
    const dispatch = useDispatch();

    const wrapperRef = useRef();

    const sendMessage = (text) => {
        push(getMsgsListRefById(id), {
            author: auth.currentUser.email,
            text,
            id: `msg-${Date.now()}`,
        });
    };

    useEffect(() => {
        const unsubscribe = onValue(getMsgsRefById(id), (snapshot) => {
            const val = snapshot.val();
            if (!snapshot.val()?.exists) {
                setMessages(null);
            } else {
                console.log(val.messageList);
                setMessages(Object.values(val.messageList || {}));
            }
        });

        return unsubscribe;
    }, [id]);

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
