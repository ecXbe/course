import './style.scss';
import $ from 'jquery';

function formatTime(value: number): string {
    return value < 10 ? "0" + value : value.toString();
}

function UpdateClock(): void {
    let now: Date = new Date();
    let hours: string = formatTime(now.getHours());
    let minutes: string = formatTime(now.getMinutes());
    let seconds: string = formatTime(now.getSeconds());
    
    let timeString: string = hours + ':' + minutes + ':' + seconds;
    $(".clock").text(timeString);
}

$(".burger").on("click", function() {
    $("header").toggleClass("active"); 
});

setInterval(function() {
    UpdateClock();
}, 1000);

$(window).on("scroll", function() {
    let windowScrollTop = $(window).scrollTop();
    if (typeof windowScrollTop === 'undefined') return;
    
    $('div[id]').each(function() {
        let offset = $(this).offset();
        if (!offset) return;
        
        if (windowScrollTop >= offset.top - 100) {
            const id = $(this).attr('id');
            if (!id) return;
            
            $('.anchor.top a').removeClass('active');
            $(`.anchor.top a[href="#${id}"]`).addClass('active');
        }
    });
});