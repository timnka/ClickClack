const express = require('express')
const axios = require('axios').default

app = express()
const port = 5000


app.get('/words', (req, res) => {
    console.log("request received @ /words endpoint")
    axios.get('https://random-word-api.vercel.app/api?words=200')
    .then(response => {
        res.json(response.data)
    })
    .catch(error=>{
        res.status(500).json({error:'an error occurred'})
    })
})

app.get('/test', (req,res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        res.json(response.data)
    })
    .catch(error=>{
        res.status(500).json({error:'an error occurred'})
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
