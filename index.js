import menuArray from './data.js'

const modal = document.getElementById('modal')
const consentForm = document.getElementById('consent-form')
const msg = document.getElementById('thankyou')
const confirmBtn = document.getElementById('confirm-btn')

let productsOrder = []

document.addEventListener('click', function(e){
    const addBtn = e.target.closest('[data-add]') // cauta cel mai apropiat parinte cu atr data-add
    const removeBtn = e.target.closest('[data-remove]')
    if (addBtn) {
        handleAddClick(addBtn.dataset.add)
    }else if(removeBtn) {
        handleRemoveClick(removeBtn.dataset.remove)
    }
})

confirmBtn.addEventListener('click', function(){
    if(productsOrder.length > 0){
        modal.style.display = 'inline'
    }
   
})

consentForm.addEventListener('submit', function(e){
    modal.style.display = 'none'
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm)
    const name = consentFormData.get('name')
    
    msg.innerHTML = `Thanks, ${name}! Your order is on its way!`
    msg.style.display = 'block'
    document.getElementById('order').style.display = 'none'
    
})


function handleAddClick(idProduct){
    const targetObj = menuArray.filter(function(product){
        return product.id === Number(idProduct)
    })[0]

    productsOrder.push(targetObj)
    
    renderOrder()
}

function handleRemoveClick(idProduct) {
    const index = productsOrder.findIndex(product => product.id === Number(idProduct));
    if (index !== -1) {
        productsOrder.splice(index, 1); // elimin doar primul gasit
    }
    renderOrder();
}


function renderOrder() {
    let productsHtml = ''
    productsOrder.forEach(function(product){
        const {name, price, id} = product
        productsHtml += `<div class="product">
                        <h2>${name}</h2>
                        <div class="remove-btn" data-remove="${id}"><h3>remove</h3></div>
                        <p class="align-right">$${price}</p>
                    </div>`
    })
    
    const totalPrice = productsOrder.reduce((total, curr) => total + curr.price, 0)
    
    document.getElementById('products').innerHTML = productsHtml  
    document.getElementById('price').innerHTML = totalPrice
}

function getItemsHtml(){
    let itemsHtml = ''
    
    menuArray.forEach(function(product){
        const {name, ingredients, price, emoji, id} = product
        
        itemsHtml += `<div class="item">
                        <div class="food" role="img">${emoji}</div>
                            <div class="info">
                                <h2>${name}</h2>
                                <h3>${ingredients}</h3>
                                <p>$${price}</p>
                            </div>
                            <div id="btn-shop" class="align-right" data-add="${id}" role="button">
                                <img src="./images/plus.png" alt="plus symbol for button add">
                            </div>
                        </div>`
                     
    })
    
    return itemsHtml
}

function render(){
    document.getElementById('list').innerHTML = getItemsHtml()
}

render()