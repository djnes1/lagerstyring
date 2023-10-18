let appData = "";
if (data) {
  appData = data;
}

function createProductButton() {
  const form = document.getElementById("product-form");
  form.addEventListener("submit", validateForm);

  function validateForm(event) {
    event.preventDefault();
    const productName = document.querySelector(
      'input[name="input-name"]'
    ).value;
    const productID = document.querySelector(
      'input[name="input-produkt-id"]'
    ).value;
    const amount = document.querySelector('input[name="input-amount"]').value;

    if (
      productName.trim() === "" ||
      productID.trim() === "" ||
      amount.trim() === ""
    ) {
      alert("Udfyld venligst alle felter.");
      return;
    }

    form.submit();
  }
}

function lockVans() {
  const user = appData.user;
  const userVan = user.van;

  if (userVan && !(user.role === "admin")) {
    const dropDownElement = document.getElementById("dropdown-select-van");
    const options = dropDownElement.options;

    for (let i = 0; i < options.length; i++) {
      let id = options[i].id.split("-")[1];
      if (id === userVan) {
        dropDownElement.selectedIndex = i;
      } else {
        options[i].disabled = "true";
      }
    }
  }
}

function initFunctions() {
  createProductButton();
  lockVans();
}

initFunctions();
