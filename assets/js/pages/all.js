const user = localStorage.getItem("user");

const userAccount = document.querySelector(".user-account");
const vendorAccount = document.querySelector(".vendor-account");

userAccount.addEventListener("click", async () => {
  const scopes = ["username", "payments"];
  const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

  console.log(authResult);
});

const getUserFromPI = () => {};
