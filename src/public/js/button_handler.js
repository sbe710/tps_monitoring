import $ from 'jquery';
import _ from 'underscore';
import { default as notice } from './notice_handler';

function buttonHandler() {
    const Url = 'https://jsonplaceholder.typicode.com/posts';
    $('.button.jsGetInfo').click(() => {
        $('.loader').show();
        $.ajax({
            url: Url,
            type: "GET",
            success: (result) => {
                $('.loader').hide();
                $('.view__info').show();
                $('.view__info').text(result[0].title);
            },
            error: (error) => {
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
    });

    $('.button.jsChart').click(() => {
        $('#myChart').css('display') === 'none' ? $('#myChart').fadeIn('slow', showChart())
                                                : $('#myChart').fadeOut('slow', hideChart());
    });

    $(document).on('click', '._shrink', () => {
        let throttled = _.throttle(expandChart, 200);
        throttled();
    });

    $(document).on('click', '._expanded', () => {
        let throttled = _.throttle(shrinkChart, 200);
        throttled();
    });

    $(document).on('click', '.jsChart', () => {
        if ($('.jsExpand').hasClass('_expanded') && $('#myChart').css('display') !== 'none') {
            let throttled1 = _.throttle(shrinkChart, 200),
                throttled2 = _.throttle(hideChart, 200);
            throttled1();
            throttled2();
        }
    });
}

function showChart() {
    $('.view__info').hide();
    $('.jsGetInfo').attr('disabled', true);
    $('.jsChart').addClass('_focused');
    $('.view').append(`<i class="icon icon-expand jsExpand _shrink"></i>`).fadeIn('slow', () => {});
}

function hideChart() {
    setTimeout(() => {
        $('.view__info').fadeIn('slow', () => {});
    }, 1000);
    $('.jsGetInfo').removeAttr('disabled');
    $('.jsChart').removeClass('_focused').blur();
    $('.jsExpand').fadeOut('slow', () => {});
}

function expandChart() {
    console.log('throttle1');
    $('.jsExpand').removeClass('_shrink').addClass('_expanded');
    $('.content').css('max-width', '100%');
    $('.view__window').animate({
        width: '800',
        height: '600',
    }, 1200, 'linear', () => {});
}

function shrinkChart() {
    console.log('throttle2');
    $('.jsExpand').removeClass('_expanded').addClass('_shrink');
    setTimeout(() => {
        $('.content').css('max-width', '600px');
    }, 1600);

    $('.view__window').animate({
        height: '300',
        width: '400',
    }, 1300, 'linear', () => {});
}

export default buttonHandler;
