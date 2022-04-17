import './Chat.style.css';

export const Chat = ({ name }) => {
    return (
        <div className='chat' >
            <span>{name}</span>
            <br />
            <span>{'Chat2'}</span>
            <br />
            <span>{'Chat3'}</span>
        </div>
    );
};
