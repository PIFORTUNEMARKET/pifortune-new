const getUsers = async () => {
  try {
    const items = document.getElementById("items")

    const res = await fetch(`${API_URL}get/all/products`)
    const data = await res.json()
    const newData = data.data
    console.log
    let products = ""
    newData.map(user => {
      let theFirstPic = user.pictures.split(";")[0]
      products += `<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 item">
      <!--Start Product Image-->
      <div class="product-image">
          <!--Start Product Image-->
          <a href="product-layout1.html" class="product-img">
              <!-- image -->
              <img class="primary blur-up lazyload"
                  data-src="${theFirstPic}"
                  src="assets/images/products/product-1.jpg" alt="image" title="">
              <!-- End image -->
              <!-- Hover image -->
              <img class="hover blur-up lazyload"
                  data-src="assets/images/products/product-1-1.jpg"
                  src="assets/images/products/product-1-1.jpg" alt="image" title="">
              <!-- End hover image -->
          </a>
          <!--End Product Image-->

          <!--Countdown Timer-->
          <div class="saleTime" data-countdown="2024/10/01"></div>
          <!--End Countdown Timer-->

          <!--Product Button-->
          <div class="button-set style0 d-none d-md-block">
              <ul>
                  <!--Cart Button-->
                  <li><a class="btn-icon btn cartIcon pro-addtocart-popup"
                          href="#pro-addtocart-popup"><i class="icon an an-cart-l"></i>
                          <span class="tooltip-label top">Add to Cart</span></a></li>
                  <!--End Cart Button-->
                  <!--Quick View Button-->
                  <li><a class="btn-icon quick-view-popup quick-view"
                          href="javascript:void(0)" data-toggle="modal"
                          data-target="#content_quickview"><i
                              class="icon an an-search-l"></i> <span
                              class="tooltip-label top">Quick View</span></a></li>
                  <!--End Quick View Button-->
                  <!--Wishlist Button-->
                  <li><a class="btn-icon wishlist add-to-wishlist"
                          href="my-wishlist.html"><i class="icon an an-heart-l"></i> <span
                              class="tooltip-label top">Add To Wishlist</span></a></li>
                  <!--End Wishlist Button-->
                  <!--Compare Button-->
                  <li><a class="btn-icon compare add-to-compare"
                          href="compare-style2.html"><i class="icon an an-sync-ar"></i>
                          <span class="tooltip-label top">Add to Compare</span></a></li>
                  <!--End Compare Button-->
              </ul>
          </div>
          <!--End Product Button-->
      </div>
      <!--End Product Image-->
      <!--Start Product Details-->
      <div class="product-details text-center">
          <!--Product Name-->
          <div class="product-name text-uppercase">
              <a href="product-layout1.html">${user.name}</a>
          </div>
          <!--End Product Name-->
          <!--Product Price-->
          <div class="product-price">
              <span class="old-price">$199.00</span>
              <span class="price">${user.price}</span>
          </div>
          <!--End Product Price-->
          <!--Product Review-->
          <div class="product-review d-flex align-items-center justify-content-center">
              <i class="an an-star"></i><i class="an an-star"></i><i
                  class="an an-star"></i><i class="an an-star"></i><i
                  class="an an-star-o"></i>
              <span class="caption hidden ms-2">3 reviews</span>
          </div>
          <!--End Product Review-->
          <!--Sort Description-->
          <p class="hidden sort-desc">Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s specimen book...</p>
          <!--End Sort Description-->
          <!--Color Variant -->
          <ul class="image-swatches swatches">
              <li class="radius blue medium"><span class="swacth-btn"></span><span
                      class="tooltip-label">Blue</span></li>
              <li class="radius pink medium"><span class="swacth-btn"></span><span
                      class="tooltip-label">Pink</span></li>
              <li class="radius red medium"><span class="swacth-btn"></span><span
                      class="tooltip-label">Red</span></li>
              <li class="radius yellow medium"><span class="swacth-btn"></span><span
                      class="tooltip-label">Yellow</span></li>
          </ul>
          <!--End Color Variant-->
          <!-- Product Button -->
          <div class="button-action d-flex">
              <div class="addtocart-btn">
                  <form class="addtocart" action="#" method="post">
                      <a class="btn pro-addtocart-popup" href="#pro-addtocart-popup"><i
                              class="icon hidden an an-cart-l"></i>Add To Cart</a>
                  </form>
              </div>
              <div class="quickview-btn">
                  <a class="btn btn-icon quick-view quick-view-popup"
                      href="javascript:void(0)" data-toggle="modal"
                      data-target="#content_quickview"><i class="icon an an-search-l"></i>
                      <span class="tooltip-label top">Quick View</span></a>
              </div>
              <div class="wishlist-btn">
                  <a class="btn btn-icon wishlist add-to-wishlist"
                      href="my-wishlist.html"><i class="icon an an-heart-l"></i> <span
                          class="tooltip-label top">Add To Wishlist</span></a>
              </div>
              <div class="compare-btn">
                  <a class="btn btn-icon compare add-to-compare" href="compare.html"><i
                          class="icon an an-sync-ar"></i> <span
                          class="tooltip-label top">Add to Compare</span></a>
              </div>
          </div>
          <!-- End Product Button -->
      </div>
      <!--End Product Details-->
  </div>
      `
      let count = document.getElementById("count")
      count.innerHTML = newData.length
    })
    items.innerHTML = products
  } catch (error) {
    console.log(error)
  }
}

getUsers()
