const removeCartItemBtn = document.getElementsByClassName("cart__remove");
const cartItemContainer = document.getElementsByClassName("cart-items")[0];
// const mainPriceElement = document.getElementsByClassName("money")[1];
const minusElement = document.getElementsByClassName("cart-minus");
const plusElement = document.getElementsByClassName("addition");
let quantityInputs = document.querySelectorAll(".cart__qty-input");
let cartRows = document.getElementsByClassName("cart__row");
let priceElement = document.getElementsByClassName("cart-money");
let totalPrice = document.getElementsByClassName("total-money");
let subTotal = document.getElementsByClassName("subtotal-money")[0];
let checkOut = document.getElementById("cartCheckout");
const backendURL = "https://api.minepi.com/v2/payments";
// const userString = localStorage.getItem("user");

// const user = JSON.parse(userString);

const accessToken =
  "sr7atpu0b5cfytp6gj0katmdsthnksrkepzamtddlwyzld5uxjmhdbgdbq8uqdue";

console.log(accessToken);

for (let i = 0; i < cartRows.length; i++) {
  let price = parseFloat(priceElement[i].innerText.replace("$", ""));
  let inputValue = Number(quantityInputs[i].value);
  let newSubTotal = price * inputValue;

  totalPrice[i].innerText = `$${newSubTotal.toFixed(2)}`;
  // const subTotal = newTotalPrice.map(x => x.item).reduce((x, y) => x + y, 0)
  // console.log(subTotal)

  plusElement[i].addEventListener("click", function (e) {
    let sum = 0;
    inputValue += 1;
    newValue = inputValue;
    quantityInputs[i].value = newValue;
    let calc = newValue * price;
    totalPrice[i].innerText = `$${calc.toFixed(2)}`;
    let combinedPrice = parseFloat(totalPrice[i].innerText.replace("$", ""));
    // sum += combinedPrice
    // subTotal.innerText = sum
    console.log((sum += combinedPrice));
  });

  minusElement[i].addEventListener("click", function (e) {
    let sum = 0;
    if (newValue <= 1) {
      inputValue = 1;
      newValue = inputValue;
    } else {
      newValue = inputValue--;
      quantityInputs[i].value = newValue;
      let calc = newValue * price;
      // console.log(calc)
      totalPrice[i].innerText = `$${calc.toFixed(2)}`;
      let combinedPrice = parseFloat(totalPrice[i].innerText.replace("$", ""));
      sum += combinedPrice;
      subTotal.innerText = sum;
      // console.log(sum)
    }
    console.log(totalPrice[i]);
  });
}

for (let i = 0; i < removeCartItemBtn.length; i++) {
  const button = removeCartItemBtn[i];
  button.addEventListener("click", (e) => {
    let btnClicked = e.target;
    btnClicked.parentElement.parentElement.parentElement.remove();
  });
}

// for (let i = 0; i < quantityInputs.length; i++) {
//   let input = quantityInputs[i]
//   input.addEventListener("change", e => {
//     e.preventDefault()
//     let inputChange = e.target.value
//     // console.log(inputChange)
//     if (isNaN(inputChange) || inputChange <= 0) {
//       inputChange = 1
//     }
//     quantity = inputChange
//   })
// }

// for (var i = 0; i < minusElement.length; i++) {
//   minusElement[i].addEventListener("click", function (event) {
//     const buttonClicked = event.target
//     console.log(buttonClicked)
//     let input = buttonClicked.parentElement.nextElementSibling
//     inputValue = input.value
//     console.log(inputValue)
//     if (isNaN(inputValue) || inputValue <= 0) {
//       var newValue = parseInt(inputValue) - 1
//       inputValue.innerText = newValue
//     }
//     // console.log(inputValue)
//     for (let i = 0; i < cartRows.length; i++) {
//       let cartRow = cartRows[i]
//       let priceElement = cartRow.getElementsByClassName("money")[1]
//       let totalPrice = cartRow.getElementsByClassName("total-money")[0]
//       let price = parseFloat(priceElement.innerText.replace("$", ""))
//       let quantity = inputValue
//       let priceMultiplication = price * quantity
//       total = priceMultiplication
//       total = Math.round(total * 100) / 100
//       totalPrice.innerText = `$${total}`
//     }
//   })

//   // updateCartTotal()
// }

// for (var i = 0; i < plusElement.length; i++) {
//   console.log(i, plusElement[i])
//   plusElement[i].addEventListener("click", function (event) {
//     const btnClicked = event.target
//     console.log(i, plusElement[i])
//     console.log(i, btnClicked)
//     let input = btnClicked.parentElement.previousElementSibling.value
//     let newValue = parseInt(input) + 1
//     input.innerText = newValue
//     console.log(input)

// for (let j = 0; j < cartRows.length; j++) {
//   let cartRow = cartRows[j]
//   console.log(cartRow)
//   let priceElement = cartRow.getElementsByClassName("money")[1]
//   let totalPrice = cartRow.getElementsByClassName("total-money")[0]
//   let price = parseFloat(priceElement.innerText.replace("$", ""))
//   let quantity = input
//   let priceMultiplication = price * quantity
//   total = priceMultiplication
//   total = Math.round(total * 100) / 100
//   totalPrice.innerText = `$${total}`
// }
//   })
// }

let requiredPayment = parseFloat(subTotal.innerHTML.replace("$", ""));

checkOut.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("here");

  const onIncompletePaymentFound = (payment) => {
    console.log("onIncompletePaymentFound", payment);

    return fetch(`${backendURL}/payments/incomplete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ payment }),
    });
  };

  const scopes = ["username", "payments"];
  const authResult = await window.Pi.authenticate(
    scopes,
    onIncompletePaymentFound
  )
    .then(async (result) => {
      console.log(result);

      const thePayment = await window.Pi.createPayment(
        {
          // Amount of π to be paid:
          amount: 0.1,
          // An explanation of the payment - will be shown to the user:
          memo: "Digital kitten", // e.g: "Digital kitten #1234",
          // An arbitrary developer-provided metadata object - for your own usage:
          metadata: {
            kittenId: 1234,
          }, // e.g: { kittenId: 1234 }
        },
        {
          // Callbacks you need to implement - read more about those in the detailed docs linked below:
          onReadyForServerApproval: function (paymentId) {
            console.log("onReadyForServerApproval", paymentId);

            try {
              fetch(`${backendURL}/payments/${paymentId}/approve`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Key ${accessToken}`,
                  credentials: "include",
                },
                body: JSON.stringify({ paymentId }),
              });
            } catch (error) {
              console.log(error);
            }
          },
          onReadyForServerCompletion: function (paymentId, txid) {
            console.log("onReadyForServerCompletion", paymentId, txid);
            fetch(`${backendURL}/payments/complete`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({ paymentId, txid }),
            });
          },
          onCancel: function (paymentId) {
            console.log(paymentId);

            return fetch(`${backendURL}/payments/cancelled_payment`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({ paymentId }),
            });
          },
          onError: function (error, payment) {
            console.log("onError", error);
            if (payment) {
              console.log(payment);
              // handle the error accordingly
            }
          },
        }
      );

      console.log(thePayment);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(authResult);
});
