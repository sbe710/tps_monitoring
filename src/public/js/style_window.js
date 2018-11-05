import $ from 'jquery';
import _ from 'underscore';

function setWindowHeight() {
    let height = $(window).height() - 1;
    $('.wrapper').height(height);
}

$(window).resize(_.debounce(setWindowHeight, 300));

export default setWindowHeight;
