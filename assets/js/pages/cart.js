const removeCartItemBtn = document.getElementsByClassName("cart__remove")
const cartItemContainer = document.getElementsByClassName("cart-items")[0]
const itemContainer = document.getElementById("cart-items")
const minusElement = document.getElementsByClassName("cart-minus")
const plusElement = document.getElementsByClassName("addition")
let quantityInputs = document.querySelectorAll(".cart__qty-input")
let cartRows = document.getElementsByClassName("cart__row")
let priceElement = document.getElementsByClassName("cart-money")
let totalPrice = document.getElementsByClassName("total-money")
let subTotal = document.getElementsByClassName("subtotal-money")[0]
const clearCart = document.getElementsByClassName("clear")[0]
const emptyCartText = document.getElementsByClassName("empty-cart-text")[0]

for (let i = 0; i < cartRows.length; i++) {
  let price = parseFloat(priceElement[i].innerText.replace("$", ""))
  let inputValue = Number(quantityInputs[i].value)
  let newSubTotal = price * inputValue

  totalPrice[i].innerText = `$${newSubTotal.toFixed(2)}`

  updateCartTotal()

  plusElement[i].addEventListener("click", function (e) {
    inputValue += 1
    quantityInputs[i].value = inputValue
    let calc = inputValue * price
    totalPrice[i].innerText = `$${calc.toFixed(2)}`
    updateCartTotal()
  })

  minusElement[i].addEventListener("click", function (e) {
    if (inputValue <= 1) {
      inputValue = 1
    } else {
      inputValue--
    }
    quantityInputs[i].value = inputValue
    let calc = inputValue * price
    totalPrice[i].innerText = `$${calc.toFixed(2)}`
    updateCartTotal()
  })
}

function updateCartTotal() {
  let sum = 0
  for (let i = 0; i < totalPrice.length; i++) {
    let totalPriceValue = parseFloat(totalPrice[i].innerText.replace("$", ""))
    sum += totalPriceValue
  }
  subTotal.innerText = "$" + sum.toFixed(2)
}

if (itemContainer.children.length === 0) {
  cartItemContainer.remove()
  emptyCartText.setAttribute("class", "d-block")
}

for (let i = 0; i < removeCartItemBtn.length; i++) {
  const button = removeCartItemBtn[i]
  button.addEventListener("click", e => {
    let btnClicked = e.target
    btnClicked.parentElement.parentElement.parentElement.remove()
  })
}

clearCart.addEventListener("click", e => {
  e.preventDefault()
  cartItemContainer.remove()
  emptyCartText.setAttribute("class", "d-block")
})
