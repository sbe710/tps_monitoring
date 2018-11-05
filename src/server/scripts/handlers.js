module.exports = {
    hello: hello,
    getStatic: getStatic,
    getState: getState
};


function hello(req, res) {
    res.send('hello world');
}

function getStatic(req, res) {
    let afr;
    res.sendFile('index.html');
}

function getState(ws, req, next) { //TODO check
    // let aWss = expressWs.getWss('/ws');
    // console.log(aWss)
    // console.log(expressWs.getWss().clients);
    ws.on('message', function(msg) {
        console.log('msg', msg)
        ws.send(msg);
        // console.log(expressWs.getWss().clients);
    });
}
