const allLogin = () => {
  try {
    const customerForm = document.getElementsByClassName("customer-form")[0];

    //check if app is in development or production
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    const API_URL = isLocalhost
      ? "http://localhost:4000/api/"
      : "https://pifortune-server.onrender.com/api/";

    customerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));

      fetch(`${API_URL}vendor/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            Toastify({
              text: res.message,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#DC3545",
              },
              onClick: function () {},
            }).showToast();
          } else {
            Toastify({
              text: res.message,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#198754",
              },
              onClick: function () {},
            }).showToast();
            localStorage.setItem("vendor", res.data.token);
            localStorage.removeItem("user");
            setInterval(() => {
              window.location.href = "/";
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    console.log(error);
  }
};

allLogin();
