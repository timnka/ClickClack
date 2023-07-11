const express = require('express')
const axios = require('axios')
const port = 5000


app = express()
app.use(express.json())

// make call to external words API to fulfill get request to the server.
app.get('/words', (request, response) => {
    console.log("request received @ /words endpoint")
    axios.get('https://random-word-api.vercel.app/api?words=5')
        .then(word_res => {
            response.json(word_res.data)
        })
        .catch(error => {
            res.status(500).json({ error: 'an error occurred' })
        })
})

// POSt request from client for score computation
app.post('/score', (req, res) => {
    console.log('post request received @ /score')
    let dataObj = req.body
    //console.log(dataObj)
    // dataObj ahs properties sample, input, and count (wordcount)
    let accuracy = 0, wpm = 0, correct = 0, incorrect = 0, extra = 0

    for (let word= 0; word < dataObj.wcount; word++) { // for each word the user got to
        for (let index = 0; index < dataObj.input[word].length; index++) { // for each letter in the USER'S INPUT word
            if (dataObj.input[word][index] === dataObj.sample[word][index]) {
                correct++
            }
        }
    }

    

})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
