import React, { useEffect, useState } from 'react'
import './TextWindow.css'

const TextWindow = () => {

    const [userInput, setUserInput] = useState('')
    const [data, setData] = useState([])
    const [correct, setCorrect] = useState(0)
    const [incorrect,setIncorrect] = useState(0)
    const [word, setWord] = useState(0)
    const [index, setIndex] = useState(0)

    // fetch words from API on render
    useEffect(() => {
        fetch('/words')
            .then(response => response.json()
            )
            .then(json => setData(json))
            .catch(error => console.error(error))
    }, [])

    

    // function to handle any changes to user input (any new character or backspace)
    const handleChange = (event) => {
        
        setUserInput(event.target.value)
        
        if (userInput[userInput.length-1] === ' ') {
            // if space is entered, move cursor to next word
            setWord(pre=>pre+1)
            setIndex(0)
        } else if (index < data[word].length && data[word][index] === userInput[userInput.length-1]) {
            setCorrect(pre=>pre+1)
            setIndex(pre=>pre+1)
        } else if (index < data[word].length && data[word][index] != userInput[userInput.length-1]) {
            setIncorrect(pre=>pre+1)
            setIndex(pre=>pre+1)
        }
    } 



    return (
        <div className="window">
            <p>{data.map((word)=><span>{word} </span>)}</p>

            <input type="text" value={userInput} onChange={handleChange}></input>
            <p>Entered text: {userInput}</p>
        </div>
    )
} // end TextWindow


export default TextWindow;
