import PropTypes from 'prop-types';
import './Message.style.css';

export const Message = ({ author, text }) => {
    return (
        <div className="message">
            <span>{author}:</span>
            <span>{' ' + text}</span>
        </div>
    );
};

Message.propTypes = {
    autor: PropTypes.string,
    text: PropTypes.string,
};