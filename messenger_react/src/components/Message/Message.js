import './Message.style.css';

export const Message = (props) => {
    console.log(props);
    return (
        <h3 className="message" onClick={props.doFoo} >
            I am a message {props.name}, age {props.age}
        </h3>
    );
};