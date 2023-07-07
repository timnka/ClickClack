const express = require('express')
const cors = require('cors')
const axios = require('axios').default

app = express()
app.use(cors())
const port = 5000

app.get('/', (req, res) => {
    res.json({'name': 'takumi imanaka'})
});

app.get('/words', (req, res) => {
    console.log("request received @ /words endpoint")
    axios.get('https://random-word-api.vercel.app/api?words=10')
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
