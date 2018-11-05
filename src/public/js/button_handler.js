import $ from 'jquery';
import { default as notice } from './notice_handler';

function buttonHandler() {
    const Url = 'https://jsonplaceholder.typicode.com/posts';
    $('.button._first').click(() => {
        $('.loader').show();
        $.ajax({
            url: Url,
            type: "GET",
            success: function(result) {
                $('.loader').hide();
                $('.view__info').show();
                $('.view__info').text(result[0].title);
            },
            error: function(error) {
                $('.content').append(notice.getTemplate('AJAX error', 'error'));
                console.log(`Error ${error}`)
            }
        });
    });

    $('.button._second').click(() => {
        $('.view__info').hide();
    });

    $('.button._notice').click(() => {
        $('.content').append(notice.getTemplate('Error click', 'error'));
    })
}

export default buttonHandler;
