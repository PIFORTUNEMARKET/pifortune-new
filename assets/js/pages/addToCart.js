const addToCartBtn = document.getElementsByClassName(
  "product-form__cart-submit"
)[0]

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
    const res = await fetch(`${API_URL}product/get/${id}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`)
    }

    const data = await res.json()
    const newData = data.data

    if (cart.some(item => item.id === id)) {
      alert("Product already in cart!")
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || []
      cart.push({
        ...newData,
        numberOfUnits: 1
      })

      localStorage.setItem("cart", JSON.stringify(cart))

      console.log("Item added to cart:", newData)
    }
  } catch (error) {
    console.error("Error:", error.message)
  }
}

addToCartBtn.addEventListener("click", () => {
  const productId = 1
  itemCart(productId)
  // window.location.href = "cart-style1.html"
})
