import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './Form.style.css';

export const Form = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    });

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
            <input className='form_input' value={value} onChange={handleCange} type='text' ref={inputRef} />
            {/* <input className='form_button' type='submit' /> */}
            {/* <TextField className='form_input' value={value} onChange={handleCange} /> */}
            <Button className='form_button' variant='contained' type='submit' >Submit</Button>
        </form>
    );
};