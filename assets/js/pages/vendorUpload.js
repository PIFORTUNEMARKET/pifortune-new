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

let vendor = localStorage.getItem("vendor")

try {
  const form = document.querySelector(".vendor-upload-detail")
  const imgContainer = document.querySelectorAll("#img-container")
  const imgPreview = document.querySelectorAll("#pictures")
  const inputIcon = document.querySelector(".pics")
  const vendorLogoutBtn = document.querySelector(".vendor-logout-btn")

  if (!vendor) {
    window.location.href = "/"
  }

  inputIcon.addEventListener("change", () => {
    for (let i = 0; i < inputIcon.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(inputIcon.files[i])
      reader.onload = () => {
        for (let i = 0; i < imgPreview.length; i++) {
          imgPreview[i].setAttribute("src", reader.result)
        }
      }
    }
  })

  form.addEventListener("submit", e => {
    e.preventDefault()

    const formData = new FormData(form)
    for (let i = 0; i < inputIcon.files.length; i++) {
      formData.append("pictures", inputIcon.files[i])
    }

    console.log(formData)

    fetch(`${API_URL}vendor/post/product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vendor}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          Toastify({
            text: res.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#DC3545"
            },
            onClick: function () {}
          }).showToast()
        } else {
          Toastify({
            text: res.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#198754"
            },
            onClick: function () {}
          }).showToast()

          setInterval(() => {
            window.location.href = "vendor-profile.html"
          }, 3000)
        }
      })
      .catch(error => console.log(error))
  })

  vendorLogoutBtn.addEventListener("click", e => {
    localStorage.removeItem("vendor")
    window.location.reload()
  })
} catch (error) {
  console.log(error)
}
