const express = require('express'),
      app = express(),
      path = require('path'),
      routes = require('./routes'),
      handlers = require('./scripts/handlers'),
      bodyParser = require('body-parser'),
      expressWs = require('express-ws')(app),
      wss = expressWs.getWss();

app.use(express.static(path.resolve('dist/public')));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') {
        res.send(400, err);
    } else { next(err) }
});
app.use((err, req, res, next) => {
    res.send(500, err);
});

function run() {
    routes.setup(app, handlers);
    app.listen(5000, () => {
        console.log('Example app listening on port 5000!');
    });

    wss.on('connection', (ws) => {
        console.log(`connection open ${ws}`);
    });
}

if (module.parent) {
    module.exports.run = run;
} else {
    run();
}

app.ws('/master', (ws, req) => {
    ws.on('message', (msg) => {
        let clientIndex = 0;
        wss.clients.forEach((client) => {
            clientIndex++;
            client.send(`client${clientIndex} ${msg}`);
        });
    });
});
