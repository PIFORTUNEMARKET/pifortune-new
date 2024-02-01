const addToCartBtn = document.getElementsByClassName(
  "product-form__cart-submit"
)[0]
const cartIcon = document.getElementsByClassName("header-cart")[0]
console.log(cartIcon)
const cartCount = document.getElementsByClassName("site-cart-count")[0]
console.log(cartCount)

//check if app is in development or production
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

const API_URL = isLocalhost
  ? "http://localhost:4000/api/"
  : "https://pifortune-server.onrender.com/api/"

let cart = []

const itemCart = async id => {
  try {
    const params = new URLSearchParams(location.search)
    const id = Number(params.get("id"))
    console.log(id)
    const res = await fetch(`${API_URL}product/get/${id}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`)
    }

    const data = await res.json()
    const newData = data.data

    const existingItem = cart.find(item => item.id === id)

    if (existingItem) {
      existingItem.numberOfUnits = 1
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      cart.push({
        ...newData,
        numberOfUnits: 1
      })

      localStorage.setItem("cart", JSON.stringify(cart))

      cartCount.innerHTML = cart.length
      console.log("Item added to cart:", newData)

      console.log("Updated Cart:", cart)
    }
  } catch (error) {
    console.error("Error:", error.message)
  }
}

addToCartBtn.addEventListener("click", id => {
  // e.preventDefault()
  itemCart(id)
})
