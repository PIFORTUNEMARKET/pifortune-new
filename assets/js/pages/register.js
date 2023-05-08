const customerForm = document.getElementsByClassName("customer-form")[0];

customerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  if (data.password !== data.confirmPassword) {
    Toastify({
      text: "Passwords do not match",
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
  }
});
