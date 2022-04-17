import './ChatList.style.css';
import { Chat } from "../Chat/Chat"

export const ChatList = () => {

    const chatList = [{ name: 'Chat1', id: 1 }, { name: 'Chat2', id: 2 }, { name: 'Chat3', id: 3 }];

    chatList.map((e) => <Chat name={e.name} />);
};