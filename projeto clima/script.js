document.querySelector('.busca').addEventListener("submit", async (event) => {
    event.preventDefault();
    document.querySelector('.resultado').style.display = 'none'
    let input = document.querySelector('#searchInput').value;
    if(input != '') {
        showWarning("Loading...")

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d4298d56d9e87914ffd2d5396c908f53&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod == 200){
            showInfo({
                name:json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempicon: json.weather[0].icon,
                windspeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            showWarning("Não encontramos essa localização")
        }
    }

});


const showWarning = (msg) => document.querySelector('.aviso').innerHTML = msg;

const showInfo = (json) => {
    showWarning('');
    let tempF = ((json.temp*1.8) + 32)
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('#C').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('#F').innerHTML = `${tempF.toFixed(2)} <sup>ºF</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windspeed} <span>Km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempicon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}