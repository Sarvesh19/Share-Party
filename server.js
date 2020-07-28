const express = require('express');

const app = express();

app.use(express.static('./dist/share-party'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/share-party/'}),
);

app.listen(process.env.PORT || 8080);