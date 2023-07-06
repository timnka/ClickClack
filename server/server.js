const express = require('express');
const axios = require('axios').default;

app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('takumi imanaka');
});

app.get('/words', (req, res) => {
    axios.get('https://random-word-api.vercel.app/api?words=10')
    .then(response => {
        res.json(response.data);
    })
    .catch(error=>{
        res.status(500).json({error:'an error occurred'});
    })
});

app.listen(port, () => {
    console.log('app listening on port ${port}');
})
