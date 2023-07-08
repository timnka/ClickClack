import React, { useEffect, useState } from 'react'
import './TextWindow.css'

const TextWindow = () => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/words')
        .then(response =>response.json()
        )
        .then(json => setData(json))
        .catch(error => console.error(error))
    }, []);
   
    return (
        <div className="window">
            {data.map((item) => <span>{item} </span>)}
        </div>
    )
}

export default TextWindow;