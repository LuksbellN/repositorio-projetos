let cart = [];
let Modalqnt = 1;
let Modalkey;

const c = el => document.querySelector(el);
const cs = el => document.querySelectorAll(el);
// Eventos do modal
pizzaJson.map((item, index) => {
    let pizzaitem = c('.models .pizza-item').cloneNode(item);
    pizzaitem.setAttribute("data-key", index);
    pizzaitem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaitem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaitem.querySelector('.pizza-item--img img').src = item.img;
    pizzaitem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaitem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        Modalqnt = 1;
        Modalkey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeindex)=>{
            if(sizeindex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeindex];
        })

        c('.pizzaInfo--qt').innerHTML = Modalqnt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;

        }, 200);
    })

    c('.pizza-area').append(pizzaitem);
})

// Eventos fora do modal
function sair() {
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(() => {
            c('.pizzaWindowArea').style.display = 'none';
        }, 500);
}

const modal = c(".pizzaWindowArea")
// Sair do modal
modal.addEventListener('click', (e)=>{
    if(e.target === e.currentTarget){
        sair();
    }
})
// Adicionar ou subtrair pizzas
c(".pizzaInfo--qtmenos").addEventListener('click', ()=>{
    if(Modalqnt > 1){
        Modalqnt--;
        c('.pizzaInfo--qt').innerHTML = Modalqnt;
    }
})
c(".pizzaInfo--qtmais").addEventListener("click", ()=>{
    Modalqnt++;
    c('.pizzaInfo--qt').innerHTML = Modalqnt;
})
// Selecionar tamanhos
cs('.pizzaInfo--size').forEach((size, sizeindex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})
// Adicionar ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[Modalkey].id +"@"+ size
    
    let key = cart.findIndex(item => item.identifier == identifier)
    if(key == -1){
        cart.push({
            identifier,
            id:pizzaJson[Modalkey].id,
            size,
            qt:Modalqnt
        })
    }else{
        cart[key].qt += Modalqnt;
    }

    updateCart();
    sair();
})


c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0'
    }
})
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})
function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;



    if(cart.length > 0){
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''

        let total = 0;
        let desconto = 0;
        let subtotal = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt

            let cartitem = c('.models .cart--item').cloneNode(true); 
            let pizzaSizeName;

            switch(cart[i].size){
                case 0: pizzaSizeName = "Pequena";
                        break;
                case 1: pizzaSizeName = "Média";
                        break;
                case 2: pizzaSizeName = "Grande";
                        break;
            }

            let Nomepizza = `${pizzaItem.name} (${pizzaSizeName})`;

            cartitem.querySelector('img').src = pizzaItem.img;
            cartitem.querySelector('.cart--item-nome').innerHTML = Nomepizza;
            cartitem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartitem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1)
                }
                updateCart();
            });

            cartitem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });


            c('.cart').append(cartitem)


        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;    
        c(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`
        c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`
        c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`
    } else {
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}