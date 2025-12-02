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

function validateName(): boolean {
    let name = $name.val() as string;
    if (name.length < 3) {
        $nameError.text('Минимум 3 символа');
        return false;
    }
    $nameError.text('');
    return true;
}

function validateEmail(): boolean {
    let email = $email.val() as string;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        $emailError.text('Некорректный email');
        return false;
    }
    $emailError.text('');
    return true;
}

function validateMessage(): boolean {
    let message = $message.val() as string;

    if (message === "") {
        $messageError.text("Сообщение должно содержать текст");
        return false; 
    }
    $messageError.text('');
    return true;
}

let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    $("html").attr('data-theme', savedTheme);
}

$(".choose_theme").on("click", function() {
    let currentTheme = $("html").attr('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    $("html").attr('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
});

$(".burger").on("click", function() {
    $(".anchor.top").toggleClass("active"); 
});

UpdateClock();
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

let $name = $("input#name");
let $nameError = $("#nameError");

let $email = $("input#email");
let $emailError = $("#emailError");

let $message = $("textarea#message");
let $messageError = $("#messageError");

$name.on('input', () => validateName());
$email.on('input', () => validateEmail());

let $sendMessageButton = $("button.contact--send");
$sendMessageButton.on("click", function() {
    if (validateName() && validateEmail() && validateMessage()) {
        $(".sent").text("Отправлено");
    }
});

