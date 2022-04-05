import './Message.style.css';

export const Message = ({ author, text }) => {
    return (
        <div className="message">
            <sapn>{author}:</sapn>
            <sapn>{text}</sapn>
        </div>
    );
};