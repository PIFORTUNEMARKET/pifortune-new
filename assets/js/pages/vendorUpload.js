const form = document.querySelector(".vendor-upload-detail");

const API_URL = isLocalhost
  ? "http://localhost:4000/api/"
  : "https://pifortune-server.onrender.com/api/";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});

const API_URL_PRODUCT = "http://localhost:4000/api/vendor/post/product";
