try {
  let user = localStorage.getItem("user")
  let vendor = localStorage.getItem("vendor")

  const userAccount = document.querySelector(".user-account")
  const vendorAccount = document.querySelector(".vendor-account")
  const authenticatedUser = document.querySelector(".authenticated-user")
  const authenticatedVendor = document.querySelector(".authenticated-vendor")
  const logoutBtn = document.querySelector(".logout-btn")

  //check if app is in development or production
  let isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )

  let API_URL = isLocalhost
    ? "http://localhost:4000/api/"
    : "https://pifortune-server.onrender.com/api/"

  if (vendor) {
    fetch(`${API_URL}vendor/auth/verify/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: vendor.toString() })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          authenticatedVendor.textContent = `Hi ${res.data.firstName}`
          vendorAccount.style.display = "none"
          userAccount.style.display = "none"
          localStorage.removeItem("user")
        }
      })
  }

  if (user) {
    localStorage.removeItem("vendor")
    authenticatedUser.textContent = `Hi ${savedUser.userName}`
    userAccount.style.display = "none"
  }

  const onIncompletePaymentFound = payment => {
    console.log("onIncompletePaymentFound", payment)
  }

  userAccount.addEventListener("click", async () => {
    const scopes = ["username", "payments"]
    const authResult = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    )

    console.log(authResult)

    fetch(`${API_URL}user/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: authResult.user.username,
        uid: authResult.user.uid
      })
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
        }
      })

    const savedUser = {
      userName: authResult.user.username,
      accessToken: authResult.accessToken
    }

    localStorage.setItem("user", JSON.stringify(savedUser))
    localStorage.removeItem("vendor")

    authenticatedUser.textContent = `Hi ${savedUser.userName}`
    userAccount.style.display = "none"
  })

  if (user || vendor) {
    logoutBtn.style.display = "block"
  } else {
    logoutBtn.style.display = "none"
  }

  logoutBtn.addEventListener("click", e => {
    localStorage.removeItem("vendor")
    localStorage.removeItem("user")
    window.location.reload()
  })
} catch (error) {
  console.log({ error })
}
