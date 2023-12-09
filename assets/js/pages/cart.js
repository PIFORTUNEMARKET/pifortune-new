const removeCartItemBtn = document.getElementsByClassName("cart__remove")
const cartItemContainer = document.getElementsByClassName("cart-items")[0]
const itemContainer = document.getElementById("cart-items")
// console.log(itemContainer)
const minusElement = document.getElementsByClassName("cart-minus")
const plusElement = document.getElementsByClassName("addition")
let quantityInputs = document.querySelectorAll(".cart__qty-input")
let cartRows = document.getElementsByClassName("cart__row")
let priceElement = document.getElementsByClassName("cart-money")
let totalPrice = document.getElementsByClassName("total-money")
let subTotal = document.getElementsByClassName("subtotal-money")[0]
let checkOut = document.getElementById("cartCheckout")
const backendURL = "https://api.minepi.com/v2/payments"

const params = new URLSearchParams(location.search)
const id = Number(params.get("id"))

//check if app is in development or production
isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

API_URL = isLocalhost
  ? "http://localhost:4000/api/"
  : "https://pifortune-server.onrender.com/api/"

const cartProducts = localStorage.getItem("cartProducts")
// const userString = localStorage.getItem("user");

// const user = JSON.parse(userString);

const accessToken =
  "sr7atpu0b5cfytp6gj0katmdsthnksrkepzamtddlwyzld5uxjmhdbgdbq8uqdue"

console.log(accessToken)
const clearCart = document.getElementsByClassName("clear")[0]
const emptyCartText = document.getElementsByClassName("empty-cart-text")[0]

let cart = JSON.parse(localStorage.getItem("cart")) || []
console.log("cart after update:", cart)

if (cart.length === 0 || cart) {
  subTotal.innerText = "$0.00"
  // localStorage.setItem("subTotal", "0.00")
  // localStorage.setItem("cart", JSON.stringify(cartData))
  // return
}

function updateCartData() {
  let cart = []
  let sum = 0

  for (let i = 0; i < cartRows.length; i++) {
    // console.log(cartRows[i])
    let quantity = Number(quantityInputs[i].value)
    let price = parseFloat(priceElement[i].innerText.replace("$", ""))
    let newSubTotal = price * quantity
    totalPrice[i].innerText = `$${newSubTotal.toFixed(2)}`
    let total = parseFloat(totalPrice[i].innerText.replace("$", ""))

    sum += total
    subTotal.innerText = "$" + sum.toFixed(2)

    cart.push({
      quantity: quantity,
      price: price,
      total: total,
      id: i
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

function handlePlusButtonClick(e, i) {
  let inputValue = Number(quantityInputs[i].value)
  inputValue + 1
  cart[i].quantity = inputValue
  let calc = cart.quantity * cart[i].price
  cart[i].total.innerText = `$${calc.toFixed(2)}`
  updateCartData()
}

function handleMinusButtonClick(e, i) {
  let inputValue = Number(quantityInputs[i].value)
  if (inputValue >= 1) {
    inputValue - 1
    cart[i].quantity = inputValue
    let calc = cart[i].quantity * cart[i].price
    cart[i].total.innerText = `$${calc.toFixed(2)}`
    updateCartData()
  }
}

function handleRemoveButtonClick(e, i) {
  console.log(e)
  console.log(i)
  // cart.splice(i, 1)
  // console.log(cart.splice(i, 1))
  // const removeBtn = e.target.parentElement.parentElement.parentElement
  // console.log(removeBtn.children)
  console.log(itemContainer)

  let items = Array.from(itemContainer.children)
  console.log(items)

  let newItem = items.splice(i, 1)

  console.log(newItem)

  // console.log(itemContainer.children)
  // itemContainer.removeChild(i)
  // removeBtn.remove()
  // localStorage.setItem("cart", JSON.stringify(cart))
  // location.reload()
  // updateCartData()
}

// Attach event listeners
for (let i = 0; i < plusElement.length; i++) {
  plusElement[i].addEventListener("click", e => handlePlusButtonClick(e, i))
}

for (let i = 0; i < minusElement.length; i++) {
  minusElement[i].addEventListener("click", e => handleMinusButtonClick(e, i))
}

for (let i = 0; i < removeCartItemBtn.length; i++) {
  removeCartItemBtn[i].addEventListener("click", e =>
    handleRemoveButtonClick(e, i)
  )
}

function checkCartEmpty() {
  if (
    itemContainer.children.length === 0 ||
    itemContainer.childElementCount === 0
  ) {
    cartItemContainer.remove()
    emptyCartText.setAttribute("class", "d-block")
    subTotal.innerText = "$0.00"
    localStorage.setItem("cart", JSON.stringify(cartData))
    return
  }
}

clearCart.addEventListener("click", (e, i) => {
  e.preventDefault()
  cartItemContainer.remove()
  cart[i] = []
  emptyCartText.setAttribute("class", "d-block")
})

window.onload = function () {
  // Assuming cart data is initially loaded from the server and stored in the "cart" variable
  // Example: cart = [{ quantity: 2, price: 10.99, total: 21.98 }, ...];

  // Populate the cartRows, quantityInputs, totalPrice, and other elements based on the loaded cart data
  // ...

  // Call functions to update cart total and check if the cart is empty

  checkCartEmpty()
  updateCartData()
}

let requiredPayment = parseFloat(subTotal.innerHTML.replace("$", ""))

checkOut.addEventListener("click", async e => {
  e.preventDefault()

  console.log("here")

  const onIncompletePaymentFound = payment => {
    console.log("onIncompletePaymentFound", payment)

    return fetch(`${backendURL}/payments/incomplete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ payment })
    })
  }

  const scopes = ["username", "payments"]
  const authResult = await window.Pi.authenticate(
    scopes,
    onIncompletePaymentFound
  )
    .then(async result => {
      console.log(result)

      const thePayment = await window.Pi.createPayment(
        {
          // Amount of π to be paid:
          amount: 0.1,
          // An explanation of the payment - will be shown to the user:
          memo: "Digital kitten", // e.g: "Digital kitten #1234",
          // An arbitrary developer-provided metadata object - for your own usage:
          metadata: {
            kittenId: 1234
          } // e.g: { kittenId: 1234 }
        },
        {
          // Callbacks you need to implement - read more about those in the detailed docs linked below:
          onReadyForServerApproval: function (paymentId) {
            console.log("onReadyForServerApproval", paymentId)

            try {
              fetch(`${backendURL}/payments/${paymentId}/approve`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Key ${accessToken}`,
                  credentials: "include"
                },
                body: JSON.stringify({ paymentId })
              })
            } catch (error) {
              console.log(error)
            }
          },
          onReadyForServerCompletion: function (paymentId, txid) {
            console.log("onReadyForServerCompletion", paymentId, txid)
            fetch(`${backendURL}/payments/complete`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({ paymentId, txid })
            })
          },
          onCancel: function (paymentId) {
            console.log(paymentId)

            return fetch(`${backendURL}/payments/cancelled_payment`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({ paymentId })
            })
          },
          onError: function (error, payment) {
            console.log("onError", error)
            if (payment) {
              console.log(payment)
              // handle the error accordingly
            }
          }
        }
      )

      console.log(thePayment)
    })
    .catch(err => {
      console.log(err)
    })

  console.log(authResult)
})
