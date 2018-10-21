import $ from 'jquery';

function setWindowHeight() {
    let height = $(window).height();
    $('.wrapper').height(height);
}

export default setWindowHeight;