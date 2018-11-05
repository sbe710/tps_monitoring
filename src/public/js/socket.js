import $ from "jquery";

function socketConnect() {
    $('.loader').show();
    let socket = new WebSocket("ws://192.168.0.101:5000/worker");

    socket.onmessage = function (event) {
        $('.view__info').show();
        $('.view__info').text(event.data);
        console.log(event)
    };

    socket.onopen = function() {
        // alert('connected');
        socket.send('connected')
        $('.loader').hide();
        $('.view__state').toggleClass('_green')
    };
}

export default socketConnect;