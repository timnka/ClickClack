const express = require('express')
const axios = require('axios')
const port = 5000


app = express()
app.use(express.json());

// make call to external words API to fulfill get request to the server.
app.get('/words', (req, res) => {
    console.log("request received @ /words endpoint")
    axios.get('https://random-word-api.vercel.app/api?words=5')
    .then(response => {
        res.json(response.data)
    })
    .catch(error=>{
        res.status(500).json({error:'an error occurred'})
    })
})

// 
app.post('/score', (req,res) => {
    console.log('post request received @ /score')
    console.log(req)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
