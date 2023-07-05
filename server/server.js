const express = require('express');
const axios = require('axios').default;

app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('takumi imanaka');
});

app.listen(port, () => {
    console.log('app listening on port ${port}');
})
