import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input value={value} onChange={handleCange} type='text' />
            <input type='submit' />
        </form>
    );
};