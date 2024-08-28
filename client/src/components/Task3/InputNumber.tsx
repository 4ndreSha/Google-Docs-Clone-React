import React, { useState } from 'react';

function InputNumber() {
    const [number, setNumber] = useState();

    const handleChange = (event) => {
        setNumber(event.target.value)
    }

    return (
        <>
            <div>Input number 😉 </div>
            <input type="number" value={number} onChange={handleChange} />
            <Message number={number} />
        </>
      );
}

function Message({ number }) {

    var text = "";
    if(number != "" && number != undefined)
    {
        if(number > 0)
            text = "Число больше нуля"
        else if(number < 0)
            text = "Число меньше нуля"
        else
            text = "Число равно нулю"
    }

    return (
        <>
            <div class="message">Message: {text}</div>
        </>
      );
}

export default InputNumber;