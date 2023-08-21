const form = document.querySelector(".vendor-upload-detail");
const imgContainer = document.querySelectorAll("#img-container");
const imgPreview = document.querySelectorAll("#pictures");
const inputIcon = document.querySelector(".pics");

inputIcon.addEventListener("change", () => {
  for (let i = 0; i < inputIcon.files.length; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(inputIcon.files[i]);
    reader.onload = () => {
      for (let i = 0; i < imgPreview.length; i++) {
        imgPreview[i].setAttribute("src", reader.result);
      }
    };
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.pictures = inputIcon.files;

  fetch(`${API_URL}vendor/post/product`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${vendor}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
