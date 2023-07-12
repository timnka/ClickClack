import React, { useState, useEffect } from 'react'

const Timer = () => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [seconds]);


    return (
        <p>{seconds}</p>
    )
}

export default Timer