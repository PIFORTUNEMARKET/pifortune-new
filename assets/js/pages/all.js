const user = localStorage.getItem("user");

const userAccount = document.querySelector(".user-account");
const vendorAccount = document.querySelector(".vendor-account");

const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({
  baseURL: `${backendURL}`,
  timeout: 20000,
  withCredentials: true,
});

const onIncompletePaymentFound = (payment) => {
  console.log("onIncompletePaymentFound", payment);
  return axiosClient.post("/payments/incomplete", { payment });
};

userAccount.addEventListener("click", async () => {
  const scopes = ["username", "payments"];
  const authResult = await Pi.authenticate(scopes);

  console.log(authResult);
});

const getUserFromPI = () => {};
