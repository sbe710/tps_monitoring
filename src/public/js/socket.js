import $ from "jquery";
function socketConnect() {
    var socket = new WebSocket("ws://192.168.0.101:5000/worker");

    socket.onmessage = function (event) {
        $('.view__info').show();
        $('.view__info').text(event.data);
        console.log(event)
    };

    socket.onopen = function () {
        alert('connected');
        socket.send('connected')
    };

    document.forms.publish.onsubmit = function () {
        var outgoingMessage = this.message.value;

        socket.send(outgoingMessage);
        return false;
    };
}

export default socketConnect;