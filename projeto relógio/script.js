let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector(".p_s");
let mElement = document.querySelector(".p_m");
let hElement = document.querySelector(".p_h");
var secondsDegrees, minDegrees, hourDegrees;
const twodigits = digit => (digit < 10) ? '0' + digit : digit;

function updateClock() {
    let now = new Date;
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    secondsDegrees = (sec * 6) - 90;
    minDegrees = (min * 6) - 90;
    hourDegrees = (hour * 30) - 90;
    
    sElement.style.transform = `rotate(${secondsDegrees}deg)`
    mElement.style.transform = `rotate(${minDegrees}deg)`
    hElement.style.transform = `rotate(${hourDegrees}deg)`

    digitalElement.innerHTML = `${twodigits(hour)}:${twodigits(min)}:${twodigits(sec)}`;
}

updateClock()
setInterval(updateClock, 1000);