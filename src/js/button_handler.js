import $ from 'jquery';

function buttonHandler() {
    const Url = 'https://jsonplaceholder.typicode.com/posts';
    $('.button._first').click(function(event) {
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
                console.log(`Error ${error}`)
            }
        })
    });

    $('.button._second').click(() => {
        $('.view__info').hide();
    });
}

export default buttonHandler;
