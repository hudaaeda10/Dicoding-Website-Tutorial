document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("onbooksaved", () => {
  console.log("data berhasil disimpan");
});

document.addEventListener("onbookload", () => {
  refreshDataBook();
});
