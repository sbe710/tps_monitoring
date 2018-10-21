import $ from 'jquery';

function setWindowHeight() {
    let height = $(window).height() - 1;
    $('.wrapper').height(height);
}

export default setWindowHeight;