import $ from "jquery";
import buttonHandler from './button_handler';
import setWindowHeight from './style_window';
import socketConnect from './socket';
import Chart from 'chart.js';
import params from './chart_config'

let ctx = $('#myChart'),
    myChart;

$(document).ready(() => {
    setWindowHeight();
    myChart = new Chart(ctx, params);
    buttonHandler();
    socketConnect();
    ctx.hide();
});
