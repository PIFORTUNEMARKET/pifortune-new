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

let newData

const getAllProducts = async () => {
  try {
    const items = document.getElementById("product-list")

    const res = await fetch(`${API_URL}get/all/products`)
    const data = await res.json()
    newData = data.data
    let products = ""
    newData.map(eachProduct => {
      let theFirstPic = eachProduct.pictures.split(";")[0]
      let theSecondPic = eachProduct.pictures.split(";")[1]
      products += `
          <div class="item mainproduct col-lg-3 col-md-4 col-6">
                                <!--Start Product Image-->
                                <div class="product-image">
                                    <!--Start Product Image-->
                                    <a href="product-layout1.html?id=${
                                      eachProduct.id
                                    }" class="product-img">
                                        <!--Image-->
                                        <img class="primary blur-up lazyload"  data-src="${theFirstPic}"
                                        src="${theFirstPic}"
                                        alt="${eachProduct.name}" title="">
                                        <!--End image-->
                                        <!--Hover image-->
                                        <img class="hover blur-up lazyload" data-src="${
                                          theSecondPic
                                            ? theSecondPic
                                            : theFirstPic
                                        }"
                                        src="${
                                          theSecondPic
                                            ? theSecondPic
                                            : theFirstPic
                                        }"
                                        alt="${eachProduct.name}" title="">
                                        <!--End hover image-->
                                    </a>
                                    <!--end product image-->

                                    <!--Product Button-->
                                    <div class="button-set-top position-absolute style1">
                                        <!--Wishlist Button-->
                                        <a class="btn-icon wishlist add-to-wishlist rounded" href="my-wishlist.html">
                                            <i class="icon an an-heart-l"></i>
                                            <span class="tooltip-label">Add To Wishlist</span>
                                        </a>
                                        <!--End Wishlist Button-->
                                        <!--Quick View Button-->
                                        <a href="javascript:void(0)" title="Quick View"
                                            class="btn-icon quick-view-popup quick-view rounded" data-toggle="modal"
                                            data-target="#content_quickview">
                                            <i class="icon an an-search-l"></i>
                                            <span class="tooltip-label">Quick View</span>
                                        </a>
                                        <!--End Quick View Button-->
                                        <!--Compare Button-->
                                        <a class="btn-icon compare add-to-compare rounded" href="compare-style2.html"
                                            title="Add to Compare">
                                            <i class="icon an an-sync-ar"></i>
                                            <span class="tooltip-label">Add to Compare</span>
                                        </a>
                                        <!--End Compare Button-->
                                    </div>
                                    <div class="button-set-bottom position-absolute add-to-the-cart style1">
                                        <!--Cart Button-->
                                        <a class="btn-icon btn btn-addto-cart pro-addtocart-popup  rounded"
                                        id="add-to-cart" onclick= "addCart(${
                                          eachProduct.id
                                        })"
                                            >
                                            <i class="icon an an-cart-l"></i> <span>Add To Cart</span>
                                        </a>
                                        <!--End Cart Button-->
                                    </div>
                                    <!--End Product Button-->
                                </div>
                                <!--End Product Image-->
                                <!--Start Product Details-->
                                <div class="product-details text-center">
                                    <!--Product Name-->
                                    <div class="product-name text-uppercase">
                                        <a href="product-layout1.html">${
                                          eachProduct.name
                                        }</a>
                                    </div>
                                    <!--End Product Name-->
                                    <!--Product Price-->
                                    <div class="product-price">
                                        <span class="price">₦${
                                          eachProduct.price
                                        }</span>
                                    </div>
                                    <!--End Product Price-->
                                    <!--Product Review-->
                                    <div class="product-review">
                                        <i class="an an-star"></i>
                                        <i class="an an-star"></i>
                                        <i class="an an-star"></i>
                                        <i class="an an-star"></i>
                                        <i class="an an-star-o"></i>
                                    </div>
                                    <!--End Product Review-->
                                    <!--Color Variant -->
                                    <!-- <ul class="swatches">
                                            <li class="swatch small rounded navy"><span
                                                    class="tooltip-label">Navy</span>
                                            </li>
                                            <li class="swatch small rounded green"><span
                                                    class="tooltip-label">Green</span>
                                            </li>
                                            <li class="swatch small rounded gray"><span
                                                    class="tooltip-label">Gray</span>
                                            </li>
                                            <li class="swatch small rounded aqua"><span
                                                    class="tooltip-label">Aqua</span>
                                            </li>
                                            <li class="swatch small rounded orange"><span
                                                    class="tooltip-label">Orange</span></li>
                                        </ul> -->
                                    <!--End Variant-->
                                </div>
                                <!--End Product Details-->
                            </div>`
    })
    items.innerHTML = products
  } catch (error) {
    console.log(error)
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  loadCart()
  await getAllProducts()
  calculation()
})

let addCartData = []
const addCart = id => {
  for (let i = 0; i < newData.length; i++) {
    newData[i].inCart = 0
  }
  const product = newData.find(item => item.id === id)

  if (product === undefined) {
    console.log("Product not found")
    return
  }

  const cartItem = addCartData.find(item => item.id === id)

  if (cartItem === undefined) {
    addCartData.push({ ...product, inCart: 1 })
  } else {
    if (cartItem.inCart < product.available_quantity) {
      cartItem.inCart += 1
    } else {
      alert("Product already exist in the cart")
    }
  }
  localStorage.setItem("addcartdata", JSON.stringify(addCartData))
  calculation()
  loadCart()
}

let calculation = () => {
  let cartIcon = document.getElementById("cart-icon-count")
  let totalItems = addCartData.reduce((acc, item) => acc + item.inCart, 0)
  if (cartIcon) {
    cartIcon.textContent = totalItems.toString()
  }
  localStorage.setItem("cartIconCount", totalItems.toString())
}

let loadCart = () => {
  const storedCart = localStorage.getItem("addcartdata")
  addCartData = storedCart ? JSON.parse(storedCart) : []

  const cartIcon = document.getElementById("cart-icon-count")
  const storedCartIconCount = localStorage.getItem("cartIconCount")
  if (cartIcon && storedCartIconCount) {
    cartIcon.textContent = storedCartIconCount
  }
}
