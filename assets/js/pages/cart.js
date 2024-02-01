const itemContainer = document.getElementById("cart-items");
let subTotal = document.getElementsByClassName("subtotal-money")[0];
const clearAllCart = document.getElementById("clear-all-items");
const emptyCartMsg = document.getElementsByClassName("empty-cart-text");
let checkOut = document.getElementById("cartCheckout");
const backendURL = "https://api.minepi.com/v2/payments";

//check if app is in development or production
isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

API_URL = isLocalhost
  ? "http://localhost:4000/api/"
  : "https://pifortune-server.onrender.com/api/";

let newStoredItem;

const storedCartItem = localStorage.getItem("addcartdata");
newStoredItem = JSON.parse(storedCartItem);

const localCartIcon = document.getElementById("cart-icon-count");
const storedIconCount = localStorage.getItem("cartIconCount");
if (localCartIcon && storedIconCount) {
  localCartIcon.textContent = storedIconCount;
}

let generateCart = () => {
  const storedCart = localStorage.getItem("addcartdata");
  newStoredItem = JSON.parse(storedCart);
  if (newStoredItem && newStoredItem.length !== 0) {
    return (itemContainer.innerHTML = newStoredItem
      .map((x) => {
        let { id, name, pictures, price, inCart, quantity } = x;
        let theFirstPic = pictures ? pictures.split(";")[0] : "";
        return `
        <tr class="cart__row border-bottom line1 cart-flex border-top" id="cart__row-${id}">
        <td class="cart-delete text-center small--hide"><a href="#" onclick="remove(${id})"
                class="btn btn--secondary cart__remove remove-icon position-static"
                data-bs-toggle="tooltip" data-bs-placement="top" title="Remove item"><i
                    class="icon an an-times-r"></i></a></td>
        <td class="cart__image-wrapper cart-flex-item">
            <a href="product-layout1.html"><img class="cart__image blur-up lazyload"
                    data-src=${theFirstPic}
                    src=${theFirstPic}
                    alt=${name} /></a>
        </td>
        <td class="cart__meta small--text-left cart-flex-item">
            <div class="list-view-item__title">
                <a href="product-layout1.html">${name}</a>
            </div>
            <div class="cart__meta-text">
                Color: Black<br>Size: Small<br>Qty: ${quantity}
            </div>
            <div class="cart-price d-md-none">
                <span class="money fw-500">$297.00</span>
            </div>
        </td>
        <td class="cart__price-wrapper cart-flex-item text-center small--hide">
            <span class="money cart-money">$ ${price}</span>
        </td>
        <td class="cart__update-wrapper cart-flex-item text-end text-md-center">
            <div class="cart__qty d-flex justify-content-end justify-content-md-center">
                <div class="qtyField">
                    <a class="qtyBtn minus cart-minus" href="javascript:void(0);" onclick="minus(${id})"><i
                            class="icon an an-minus-r"></i></a>
                    <input class="cart__qty-input qty" type="text" name="updates[]"
                        value=${inCart} pattern="[0-9]*" />
                    <a class="qtyBtn plus addition" href="javascript:void(0);" onclick="plus(${id})"><i
                            class="icon an an-plus-r"></i></a>
                </div>
            </div>
            <a href="#" title="Remove"
                class="removeMb d-md-none d-inline-block text-decoration-underline mt-2 me-3">Remove</a>
        </td>
        <td class="cart-price cart-flex-item text-center small--hide">
            <span class="total-money fw-500">$ ${price * inCart}</span>
        </td>
    </tr>`;
      })
      .join(""));
  } else {
    itemContainer.innerHTML = "<h2>Cart is Empty</h2>";
    // emptyCartMsg.setAttribute("class", "d-block")
    // label.style.display = "block"
  }
};

let plus = (id) => {
  let search = newStoredItem.find((x) => x.id === id);
  search.inCart += 1;
  localStorage.setItem("addcartdata", JSON.stringify(newStoredItem));

  updateEntireContent();
};

let minus = (id) => {
  let search = newStoredItem.find((x) => x.id === id);
  if (search.inCart <= 1) {
    search.inCart = 1;
  } else {
    search.inCart -= 1;
  }
  localStorage.setItem("addcartdata", JSON.stringify(newStoredItem));

  updateEntireContent();
};

let remove = (id) => {
  newStoredItem = newStoredItem.filter((item) => item.id !== id);
  localStorage.setItem("addcartdata", JSON.stringify(newStoredItem));

  updateEntireContent();
};

let clearCart = (e) => {
  e.preventDefault();
  console.log("Clear Cart Clicked");
  newStoredItem = [];
  localStorage.setItem("addcartdata", JSON.stringify(newStoredItem));
  generateCart();
  updateCartIconNo();
};

clearAllCart.addEventListener("click", clearCart);

let updateCartIconNo = () => {
  let result = newStoredItem.reduce((acc, item) => acc + item.inCart, 0);
  localCartIcon.textContent = result.toString();
  localStorage.setItem("cartIconCount", result.toString());
};

let TotalCartAmount = () => {
  if (newStoredItem.length && newStoredItem.length !== 0) {
    let amount = newStoredItem
      .map((item) => {
        let { inCart, price, id } = item;
        let search = newStoredItem.find((x) => x.id === id);
        return inCart * price;
      })
      .reduce((x, y) => x + y, 0);
    subTotal.innerHTML = `$ ${amount}`;
  } else {
    subTotal.innerHTML = `$ 0`;
  }
  localStorage.setItem("cartTotalPrice", JSON.stringify(subTotal));
};

const updateEntireContent = () => {
  generateCart();
  updateCartIconNo();
  TotalCartAmount();
};

updateEntireContent();

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
