const express = require('express');
app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('testing nodemon refreshing ahahdiosjfa');
});

app.listen(port, () => {
    console.log('app listening on port ${port}');
})
