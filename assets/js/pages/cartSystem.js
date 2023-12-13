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

const shoppingCartContainer = document.getElementById("shopping-cart-container")
const shoppingCart = document.getElementById("shopping-cart")
const shoppingCartNo = document.getElementById("cart-items-number")
const cartInput = document.getElementById("cart-input")
const label = document.getElementById("label")
const totalProductPrices = document.getElementById("product-price")
const openCart = document.getElementById("open-cart")

let newStoredCart

const storedCart = localStorage.getItem("addcartdata")
newStoredCart = JSON.parse(storedCart)

const cartIcon = document.getElementById("cart-icon-count")
const storedCartIconCount = localStorage.getItem("cartIconCount")
if (cartIcon && storedCartIconCount) {
  cartIcon.textContent = storedCartIconCount
}

let generateCartItem = () => {
  const storedCart = localStorage.getItem("addcartdata")
  newStoredCart = JSON.parse(storedCart)
  if (newStoredCart && newStoredCart.length !== 0) {
    return (shoppingCartContainer.innerHTML = newStoredCart
      .map(x => {
        let { id, name, pictures, price, inCart } = x
        let theFirstPic = pictures ? pictures.split(";")[0] : ""
        return `
      <li class="item d-flex justify-content-center align-items-center shopping-cart-item" id="shopping-cart_product-id-${id}">
                                <a class="product-image" href="product-layout1.html">
                                    <img class="blur-up lazyload" src="assets/images/products/cart-product-img1.jpg"
                                        data-src=${theFirstPic} alt=${name} title="">
                                </a>
                                <div class="product-details">
                                    <a class="product-title" href="product-layout1.html">${name}</a>
                                    <div class="variant-cart">Black / XL</div>
                                    <div class="priceRow">
                                        <div class="product-price">
                                            <span class="money">$${price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="qtyDetail text-center">
                                    <div class="wrapQtyBtn">
                                        <div class="qtyField">
                                            <a class="qtyBtn minus" href="javascript:void(0);" onclick="decrement(${id})"><i
                                                    class="icon an an-minus-r" aria-hidden="true"></i></a>
                                            <input type="text" name="quantity" value=${inCart} class="qty" id="cart-input">
                                            <a class="qtyBtn plus" href="javascript:void(0);" onclick="increment(${id})"><i
                                                    class="icon an an-plus-l" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                    <a onclick="removeItem(${id})" href="#" class="remove"><i class="an an-times-r" data-bs-toggle="tooltip"
                                            data-bs-placement="top" title="Remove"></i></a>
                                </div>
                            </li>
      `
      })
      .join(""))
  } else {
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    `
  }
}

openCart.addEventListener("click", () => {
  generateCartItem()
})

shoppingCartNo.innerHTML = newStoredCart.length

let increment = id => {
  let search = newStoredCart.find(x => x.id === id)
  search.inCart += 1
  localStorage.setItem("addcartdata", JSON.stringify(newStoredCart))

  updateCartIconCount()

  generateCartItem()

  TotalAmount()
}

let decrement = id => {
  let search = newStoredCart.find(x => x.id === id)
  if (search.inCart <= 1) {
    search.incart = 1
  } else {
    search.inCart -= 1
  }
  localStorage.setItem("addcartdata", JSON.stringify(newStoredCart))

  updateCartIconCount()

  generateCartItem()

  TotalAmount()
}

let removeItem = id => {
  newStoredCart = newStoredCart.filter(item => item.id !== id)
  localStorage.setItem("addcartdata", JSON.stringify(newStoredCart))

  generateCartItem()

  updateCartIconCount()

  TotalAmount()
}

let updateCartIconCount = () => {
  const cartIcon = document.getElementById("cart-icon-count")
  let result = newStoredCart.reduce((acc, item) => acc + item.inCart, 0)
  cartIcon.textContent = result.toString()
  localStorage.setItem("cartIconCount", result.toString())
}

let TotalAmount = () => {
  if (newStoredCart.length && newStoredCart.length !== 0) {
    let amount = newStoredCart
      .map(item => {
        let { inCart, price, id } = item
        let search = newStoredCart.find(x => x.id === id)
        return inCart * price
      })
      .reduce((x, y) => x + y, 0)
    totalProductPrices.innerHTML = `$ ${amount}`
  } else {
    totalProductPrices.innerHTML = `$ 0`
  }
  localStorage.setItem("cartTotalPrice", JSON.stringify(totalProductPrices))
}

TotalAmount()
