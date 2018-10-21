import $ from "jquery";
import buttonHandler from './button_handler';
import setWindowHeight from './style_window';

$(document).ready(function() {
    setWindowHeight();
    buttonHandler();
});
