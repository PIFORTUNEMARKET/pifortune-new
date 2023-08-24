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
  for (let i = 0; i < inputIcon.files.length; i++) {
    formData.append("pictures", inputIcon.files[i]);
  }
  for (item of formData) {
    console.log(item[0], item[1]);
  }

  fetch(`${API_URL}vendor/post/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vendor}`,
      "Content-Type":
        "multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((formData) => console.log(formData))
    .catch((error) => console.log(error));
});
