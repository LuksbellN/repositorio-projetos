var sec = 0, min = 0, hr = 0, buffer = 0
var intervalo

// Deixar sempre com 2 dígitos os números
const twodigits = digit => (digit < 10) ? '0' + digit : digit;

// Start
function start() {
    if(buffer <= 0){
        showtime();
        intervalo = setInterval(showtime, 1000);
        buffer++;
    }
}

// Stop
function stop() {
    clearInterval(intervalo);
    sec = 0;
    min = 0;
    document.querySelector('#cont').innerText = `00:00:00`;
    buffer = 0;
}

// Pause
function pause() {
    clearInterval(intervalo);
    buffer = 0;
}

// Atualizar o cronômetro
function showtime() {
    sec++;
    if(sec == 60){
        sec = 0;
        min++;
        if(min == 60){
            min = 0;
            hr++;
        }
    }
    document.querySelector('#cont').innerText = `${twodigits(hr)}:${twodigits(min)}:${twodigits(sec)}`
}