import React, { useEffect, useState } from 'react'
import icon from './icons/reload.svg'
import './TextWindow.css'

const TextWindow = () => {
    const INTERVAL = 30
    const [sample, setSample] = useState([]) // array of strings. the sample text displayed
    const [input, setInput] = useState([]) // the full array of strings the user inputs
    const [curr, setCurr] = useState('') // the running string of the word the user is typing
    const [wcount, setWcount] = useState(0) // total number of words completed (raw, no errors accounted for)
    const [results, setResults] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [activeWordIndex, setActiveWordIndex] = useState(0)

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
            setActiveWordIndex(pre => pre + 1)
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

    //
    const handleReload = () => {
        window.location.reload()
    }

    // if typing <p> {(firstKeyDown) === false ? 60 : <Timer></Timer> } </p>
    if (seconds > 0 && wcount < sample.length) {
        return (
            <div className="">
                <div className="timer">
                    <p className="text" id="timer">{seconds} </p>
                </div>

                <div className="window">
                    <p>{sample.map((word, index) => {
                        if (index === activeWordIndex) {
                            return <b className="text" id="sample-active">{word} </b>
                        }
                        return <span className="text" id="sample">{word} </span>
                    })}</p>
                </div>

                <div className="searchPanel">
                    <input className="input" id="timer" type="text" placeholder={sample[activeWordIndex]} value={curr} onChange={handleChange} autoFocus></input>
                </div>
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
                setResults(stats)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
            })


        return (isLoading ? <h1>Loading...</h1> :
            <div className="results">

                <h1 className="text" id="results-text">Results: </h1>

                <div>
                    <span className="text" id="result-keys">wpm: </span>
                    <span className="text" id="result-val">{results.wpm}</span>
                </div>

                <div>
                    <span className="text" id="result-keys">acc: </span>
                    <span className="text" id="result-val">{results.accuracy}</span>
                    <span className="text" id="result-val">%</span>
                </div>


                <button className="reload-btn" onClick={handleReload}>
                    <img className="icon" src={icon}></img>
                </button>
            </div>

        )
    }
} // end TextWindow


export default TextWindow
