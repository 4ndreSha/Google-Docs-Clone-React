import React from 'react';
import { useRef } from 'react';

const UserForm = () => {

    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;