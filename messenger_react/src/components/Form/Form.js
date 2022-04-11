import { useState } from 'react';
import './Form.style.css';

export const Form = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
    };

    const handleCange = (e) => {
        setValue(e.target.value);
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input className='form_input' value={value} onChange={handleCange} type='text' />
            <input className='form_button' type='submit' />
        </form>
    );
};