import $ from 'jquery';

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
                $('.content').append('<div class="notice _error"><div class="notice__content">ERROR ${error}</div></div>')
                console.log(`Error ${error}`)
            }
        });
    });

    $('.button._second').click(() => {
        $('.view__info').hide();
    });

    $('.button._notice').click(() => {
        $('.content').append('<div class="notice _error"><div class="notice__content">ERROR</div></div>')
    })
}

export default buttonHandler;
