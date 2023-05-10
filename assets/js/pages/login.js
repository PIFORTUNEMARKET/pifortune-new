const customerForm = document.getElementsByClassName("customer-form")[0];
// const API_URL = "http://localhost:4000/api/";
const API_URL = "https://pifortune-server.onrender.com/api/";

customerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));

  fetch(`${API_URL}user/auth/login`, {
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
        console.log(res);
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
        localStorage.setItem("user", JSON.stringify(res.data.token));
        setInterval(() => {
          window.location.href = "/";
        }, 3000);
      }
    })
    .catch((err) => console.log(err));

  //   if (data.password.length < 8) {
  //     Toastify({
  //       text: "Password must be more than 8 characters",
  //       duration: 3000,
  //       close: true,
  //       gravity: "top",
  //       position: "right",
  //       stopOnFocus: true,
  //       style: {
  //         background: "#DC3545",
  //       },
  //       onClick: function () {},
  //     }).showToast();
  //   } else if (data.password !== data.confirmPassword) {
  //     Toastify({
  //       text: "Passwords do not match",
  //       duration: 3000,
  //       close: true,
  //       gravity: "top",
  //       position: "right",
  //       stopOnFocus: true,
  //       style: {
  //         background: "#DC3545",
  //       },
  //       onClick: function () {},
  //     }).showToast();
  //   } else {
  //     delete data.confirmPassword;
  //   }
});
