import $ from 'jquery';
import { default as notice } from './notice_handler'

function socketConnect() {
    $('.loader').show();
    let socket = new WebSocket("ws://192.168.0.101:5000/worker");

    socket.onmessage = function (event) {
        $('.view__info').show();
        $('.view__info').text(event.data);
        console.log(event)
    };

    socket.onopen = function() {
        socket.send('connected')
        $('.loader').hide();
        $('.content').append(notice.getTemplate('WS connection established', 'success'));
        $('.view__state').toggleClass('_green');
    };
}

export default socketConnect;