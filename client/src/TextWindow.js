import React, { useEffect, useState } from 'react'
import './TextWindow.css'

const TextWindow = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/words')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="window">
            {data ? <pre>{JSON.stringify(data)}</pre> : 'Loading...'}
        </div>
    )
}

export default TextWindow;