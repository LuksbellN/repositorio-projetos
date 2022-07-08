// Initial data
let table = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
var pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',
    'a1,b2,c3',
    'c1,b2,a3',
    'a1,b1,c1',
    'a2,b2,c3',
    'a3,b3,c3'
]
let player = '', warning = '', playing = false;

// Events
reset()
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener("click", itemClick)
})

// Functions

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing == true && table[item] === ''){
        table[item] = player;
        renderTable();
        player = (player === 'X') ? 'O' : 'X'
        renderInfo();
    }
    checkGame();
}

function reset(){
    warning = '';
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'X' : 'O' ;
    for(let i in table){
        table[i] = '';
    };
    playing = true;
    
    renderTable();
    renderInfo();
};

function renderTable() {
    for(let i in table){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = table[i];
    };
};

function renderInfo () {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};
function checkGame() {
    if(checkWinner('X')){
        document.querySelector('.resultado').innerHTML = `O "X" foi o vencedor`;
        playing = false;
    } else if(checkWinner('O')){
        document.querySelector('.resultado').innerHTML = `O "O" foi o vencedor`;
        playing = false;
    } else if(isFull()){
        document.querySelector('.resultado').innerHTML = `Empate`;
        playing = false;
    }
}
function checkWinner(player){
    for(let w in pos){
        let pArray = pos[w].split(',');
        let haswon = pArray.every(option => table[option] === player);
        if(haswon == 1){
            return true;
        }
    }
    return false;
};
function isFull() {
    for(let i in table){
        if(table[i] === ''){
            return false;
        }
    }
    return true;
};