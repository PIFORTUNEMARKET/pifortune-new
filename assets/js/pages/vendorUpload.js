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

  fetch(`${API_URL}vendor/post/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vendor}`,
    },
    body: formData,
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

        setInterval(() => {
          window.location.href = "vendor-profile.html";
        }, 3000);
      }
    })
    .catch((error) => console.log(error));
});
