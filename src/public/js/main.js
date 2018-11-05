import $ from "jquery";
import buttonHandler from './button_handler';
import setWindowHeight from './style_window';
import socketConnect from './socket';

$(document).ready(() => {
    setWindowHeight();
    buttonHandler();
    socketConnect();
});
