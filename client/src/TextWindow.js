import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import './TextWindow.css'

const TextWindow = () => {
    const INTERVAL = 20
    const [sample, setSample] = useState([]) // array of strings. the sample text displayed
    const [input, setInput] = useState([]) // the full array of strings the user inputs
    const [curr, setCurr] = useState('') // the running string of the word the user is typing
    const [wcount, setWcount] = useState(0) // total number of words completed (raw, no errors accounted for)
    const [firstKeyDown, setFirstKeyDown] = useState(false)

    // fetch words from API on render
    useEffect(() => {
        fetch('/words')
            .then(response => response.json()
            )
            .then(json => setSample(json))
            .catch(error => console.error(error))
    }, [])

    // function to handle any changes to user input (any new character or backspace)
    const handleChange = (event) => {
        if (event.target.value.endsWith(' ')) {
            setInput(prevInput => [...prevInput, event.target.value.substring(0, event.target.value.length - 1)]) // append user input
            setCurr('')
            setWcount(pre => pre + 1)
            console.log(input)
        }
        else {
            setCurr(event.target.value)
        }
    }

    //timer
    const [seconds, setSeconds] = useState(INTERVAL)
    const [timerStarted, setTimerStarted] = useState(false)

    useEffect(() => {
        const handleKeyDown = () => {
            if (!timerStarted) {
                setTimerStarted(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (timerStarted && seconds > 0) {
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timerStarted, seconds]);


    // if typing <p> {(firstKeyDown) === false ? 60 : <Timer></Timer> } </p>
    if (seconds > 0 && wcount < sample.length) {
        return (
            <div className="window">
                <p>{sample.map((word) => <span>{word} </span>)}</p>

                <input type="text" value={curr} onChange={handleChange}></input>
                <p>Entered text: {curr}</p>
                <p>Full input: {input} </p>
                <p>Seconds: {seconds} </p>
            </div>
        )
    }
    // if game over
    else {
        const post_body = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                'sample': sample,
                'input': input,
                'wcount': wcount,
                'seconds': INTERVAL
            })
        }

        fetch('/score', post_body)
            .then(response => response.json())
            .then(stats => {
                // Handle the response from the server
                console.log(stats);
            })
            .catch(error => {
                console.error('Error:', error);
            })

        return (
            <h1>Completed type test!</h1>
        )
    }
} // end TextWindow


export default TextWindow
