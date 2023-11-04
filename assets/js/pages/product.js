try {
  const params = new URLSearchParams(location.search)
  const id = Number(params.get("id"))

  const approve = document.getElementsByClassName("approve")[0]
  const cancel = document.getElementsByClassName("cancel")[0]
  const productTitle = document.getElementsByClassName(
    "product-single__title"
  )[0]
  const productName = document.getElementsByClassName("product-name")[0]
  const productPrice = document.getElementsByClassName(
    "product-price__price product-price__sale"
  )[0]
  const images = document.getElementsByClassName("zoompro")[0]
  const descriptionText = document.getElementsByClassName("description-text")[0]
  const title = document.getElementsByClassName("collection-hero__title")[0]
  const itemQuantity = document.getElementsByClassName("bold-item")[0]
  const gallery = document.getElementById("gallery")
  const anotherGallery = document.getElementsByClassName("gallery")

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

  const getProduct = async () => {
    const items = document.getElementById("items")

    const res = await fetch(`${API_URL}product/get/${id}`)
    const data = await res.json()
    const newData = data.data
    console.log(newData)

    const {
      VendorId,
      createdAt,
      description,
      id: uid,
      inStock,
      name,
      pictures,
      price,
      quantity,
      tags,
      updatedAt,
      vendorId
    } = newData

    let allImages = pictures.split(";")

    let productImages = ""

    allImages.map(eachPicture => {
      productImages += `
            <a data-image=${eachPicture}
    data-zoom-image=${eachPicture}
    class="slick-slide slick-cloned">
    <img class="blur-up lazyload"
        data-src=${eachPicture}
        src=${eachPicture} />
</a>        
        `
    })

    gallery.innerHTML = productImages

    gallery.addEventListener("click", e => {
      target = e.target.src
      images.setAttribute("src", target)
    })

    productName.textContent = name
    productTitle.textContent = name
    productPrice.textContent = price
    descriptionText.textContent = description
    title.textContent = name
    itemQuantity.textContent = quantity
    if (inStock === true) {
      approve.style.display = "block"
      cancel.style.display = "none"
    } else {
      approve.style.display = "none"
      cancel.style.display = "block"
    }
  }

  getProduct()
} catch (error) {
  console.log(error)
}
