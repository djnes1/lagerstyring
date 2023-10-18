let appData = "";
if (data) {
  appData = data;
}

function deleteProductButton() {
  const deleteButtonElements = document.getElementsByClassName("delete-button");
  for (const e of deleteButtonElements) {
    const productId = e.dataset.productid;
    e.addEventListener("click", async () => {
      const response = await fetch(`/deleteProduct/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const productboksediv = e.parentElement.parentElement;
      productboksediv.remove();
    });
  }
}

// ----------- INCREASE/DECREASE PRODUCT AMOUNT -------------------------------------------------------------------

/*
Looper igennem alle increaseButtons 
og giver dem en eventlistener
Gem productId for at kunne opdatere
aktuelle product i db

send et request til serveren
hvor i body'en af requestet 
er en action property der 
fortæller serveren hvad den skal 
gøre med requestet
Responset fra requestet gemmes i en variabel

Find aktuelle paragraph element
ved at få alle elementer med 
klassen storage. Filtrer for dem
der har data productId

opdater dette paragraph elements
text, så det passer med det nye
antal products

*/
function plusMinButtons() {
  const plusminButtonElements =
    document.getElementsByClassName("button-plusmin");

  if (plusminButtonElements) {
    for (const e of plusminButtonElements) {
      const productId = e.dataset.productid;
      const btnAction = e.dataset.action;

      e.addEventListener("click", async () => {
        let response;

        if (btnAction === "edit") {
          const newAmount = prompt("Enter amount:");
          response = await fetch(`/products/${productId}/amount`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: btnAction, newAmount: newAmount }),
          });
        } else {
          response = await fetch(`/products/${productId}/amount`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: btnAction }),
          });
        }
        const json = await response.json();

        const amount = json.amount;
        const unit = json.unit;

        const storagePElement = Array.from(
          document.getElementsByClassName("storage-p")
        ).filter((e) => e.dataset.productid === productId)[0];
        storagePElement.innerHTML = `På lager: ${amount} ${unit}`;
      });
    }
  }
}

//------------------------------- SELECT VAN-----------------------------------------------

function selectVanDropdown() {
  const selectVanDropdownElement = document.getElementById(
    "dropdown-select-van"
  );

  if (selectVanDropdownElement) {
    selectVanDropdownElement.addEventListener("change", async () => {
      const selectedIndex = selectVanDropdownElement.selectedIndex;
      const selectedLicensePlateId =
        selectVanDropdownElement.options[selectedIndex].id;
      if (selectedLicensePlateId === "option-show-all") {
        updateHtmlProducts(data.products);
      } else {
        const selectedLicensePlate = selectedLicensePlateId.split("-")[1];

        let response = await fetch(`/van/${selectedLicensePlate}/products`, {
          method: "POST",
        });
        const vanProducts = await response.json();
        updateHtmlProducts(vanProducts);
      }
    });
  }
}

function updateHtmlProducts(products) {
  const productContainerElement = document.getElementById("container-products");

  productContainerElement.innerHTML = "";
  if (products.length === 0) {
    productContainerElement.innerHTML +=
      "<br><p> Der er ingen varer på denne vogn </p>";
  }
  for (const product of products) {
    productContainerElement.innerHTML += `  
        <div class="product-container">
          <p>${product.name}</p>
          <p class="storage-p" data-productid="${product.productId}">På lager: ${product.amount} ${product.unit}</p>
          <div class="buttons-trash-and-plusmin">
            <button class="delete-button" type="button" data-productid="${product.productId}" id="button-delete-product">
              <ion-icon name="trash-outline" role="img" class="md hydrated"></ion-icon>
            </button>
            <div class="buttons-plus-minus">
              <button class="button-plusmin" type="button" data-productid="${product.productId}" data-action="increase">
                <ion-icon name="add-circle-outline" role="img" class="md hydrated"></ion-icon>
              </button>

              <button class="button-plusmin" type="button" data-productid="${product.productId}" data-action="edit">
              <ion-icon name="pencil-outline" role="img" class="md hydrated"></ion-icon>
            </button>

              <button class="button-plusmin" type="button" data-productid="${product.productId}" data-action="decrease">
                <ion-icon name="remove-circle-outline" role="img" class="md hydrated"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        `;
  }
  deleteProductButton();
  plusMinButtons();
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

    // for (const o of options) {
    //   let id = o.id.split("-")[1];
    //   if (id === userVan) {
    //     o.selected = "true";
    //   } else {
    //     o.disabled = "true";
    //   }
    // }
  }
}

function initFunctions() {
  lockVans();
  deleteProductButton();
  plusMinButtons();
  selectVanDropdown();
}

initFunctions();
