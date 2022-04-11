import { Message } from "../Message/Message"

export const MessageList = ({ messages }) =>
    messages.map((msg) => <Message text={msg.text} author={msg.author} />);

