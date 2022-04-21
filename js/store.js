if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
let total = 0

function ready() {
    //warenkorbartikel löschen
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function sendEmail(name, email, adresse, land, cartItems, total, groesse) {
    const message = `
    ${name}
    ${'E-mail : ' + email}
    ${'Adresse : ' + adresse}
    ${'Land : ' + land}
    ${'Material : 1.Stoffüberzug 2.Metallteile 3.Polsterung' + cartItems}
    ${'Gesamt Preis : ' + total+' Euro'}
    ${'Pferde groesse : ' + groesse}`;
    //send email to dognate.net
    fetch('http://www.dognate.net/ajax-email.php', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: `name=${encodeURI(name)}&email=${encodeURI(email)}&message=${encodeURI(message)}`
    })
}

function loadCartItems() {
    return window.sessionStorage.getItem('cart');
}
//check email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//reset kontaktDaten
function resetPurchaseForm() {
    document.getElementById('kontakt-Name').value = null;
    document.getElementById('kontakt-Email').value = null;
    document.getElementById('kontakt-Adresse').value = null;
    document.getElementById('kontakt-Land').value = null;
}

function purchaseClicked() {
    const name = document.getElementById('kontakt-Name').value;
    const email = document.getElementById('kontakt-Email').value;
    const adresse = document.getElementById('kontakt-Adresse').value;
    const land = document.getElementById('kontakt-Land').value;
    var cartItems = loadCartItems();
    const groesse = document.getElementById('groesse').value;

    if (validateEmail(email)) {
        sendEmail(name, email, adresse, land, cartItems, total, groesse)
        alert('Danke für Ihre Bestellung. Ihr Auftrag wird bearbeitet. Sie erhalten in kürze die Auftragsbestätigung')
        resetPurchaseForm();
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    } else {
        alert('Ungültige E-Mail!')
    }
}

function removeCartItem(buttonClicked, title) {
    buttonClicked.parentElement.parentElement.remove()

    let cart = JSON.parse(window.sessionStorage.getItem('cart'));
    if (cart) {
        const index = cart.indexOf(title);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart));

    updateCartTotal()
}
//menge aendern
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//Warenkorb hinzufügen
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    let auswahlStoff = document.getElementById("stoffueberzug").value;
    let auswahlMetall = document.getElementById("metallteile").value;
    let auswahlPolster = document.getElementById("polsterung").value;
    let title = auswahlStoff + " " + auswahlMetall + " " + auswahlPolster;
    var price = shopItem.getElementsByClassName('artikel-preis')[0].innerText
    //check material ausgewaehlt
    if (auswahlStoff && auswahlMetall && auswahlPolster) {
        addItemToCart(title, price)
        updateCartTotal()
    } else {
        alert('Bitte wählen Sie drei Materialien aus!')
    }
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Diese Auswahl ist schon vorhanden!')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button" onClick="removeCartItem(this, \'${title}\')">LÖSCHEN</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)


    let cart = JSON.parse(window.sessionStorage.getItem('cart'));
    if (cart) {
        cart.push(title);
    } else {
        cart = [title];
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
}