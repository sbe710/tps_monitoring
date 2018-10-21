let express = require('express'),
    app = express(),
    path = require('path'),
    staticPath = path.resolve('dist/public');

app.use(express.static(staticPath));

app.get('/', function(req, res) {
    res.sendFile(staticPath + '/index.html');
});

app.listen(5000, function() {
    console.log('Example app listening on port 5000!');
});
