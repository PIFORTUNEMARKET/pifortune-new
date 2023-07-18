const user = localStorage.getItem("user");
const vendor = localStorage.getItem("vendor");

const userAccount = document.querySelector(".user-account");
const vendorAccount = document.querySelector(".vendor-account");
const authenticatedUser = document.querySelector(".authenticated-user");
const authenticatedVendor = document.querySelector(".authenticated-vendor");

if (vendor) {
  authenticatedVendor.textContent = `Hi ${savedUser.userName}`;
  userAccount.style.display = "none";
}

const onIncompletePaymentFound = (payment) => {
  console.log("onIncompletePaymentFound", payment);
};

userAccount.addEventListener("click", async () => {
  const scopes = ["username", "payments"];
  const authResult = await window.Pi.authenticate(
    scopes,
    onIncompletePaymentFound
  );

  const savedUser = {
    userName: authResult.user.username,
    accessToken: authResult.accessToken,
  };

  localStorage.setItem("user", JSON.stringify(savedUser));

  authenticatedUser.textContent = `Hi ${savedUser.userName}`;
  userAccount.style.display = "none";
});

const getUserFromPI = () => {};
