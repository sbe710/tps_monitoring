import $ from 'jquery';

export default {
    getTemplate: getTemplate,
};

function getTemplate(text, name) {
    let template = `<div class="notice _${name}"><div class="notice__content">${text}</div></div>`;
    hide();
    return template;
}

function hide() {
    $(document).on('click', '.notice', (event) => {
        handler();
    });
    setTimeout(() => {
        handler()
    }, 3000);
}
//TODO modify handler to remove only called notices, not last
function handler() {
    $('.notice:last-child').animate({
        top: "-=350",
    }, 1000, () => {
        $('.notice:last-child').remove();
    });
}
