import React, { useState } from 'react';


function TextWrapper({text}) {
    
    const [collapsed, setCollapsed] = useState(true);

    const handleClick = () => {
        setCollapsed(!collapsed);
    }

    return (
        <>
            {collapsed ? 
                <div class="wrapped-text">
                    <div>{text.split('.')[0] + '...'}</div>
                    <button class="collapse-button" onClick={handleClick}>Развернуть</button>
                </div>
                :
                <div class="wrapped-text">
                    <div>{text}</div>
                    <button class="collapse-button" onClick={handleClick}>Свернуть</button>
                </div>
            }
        </>
    );
}

export default TextWrapper;