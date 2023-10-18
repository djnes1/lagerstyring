
function deleteVanButton() {
  if (document.getElementById("delete-van")) {
    // på forsiden er der ikke noget der hedder delete-van,
    // så der fejler den, hvis ikke der lige et et tjek på
    // om der findes en "delete-van" på den side man er på.
    const deleteVanButtonElement = document.getElementById("delete-van");

    deleteVanButtonElement.addEventListener("click", async () => {
      const selectElement = document.querySelector("#dropdown-select-van");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      let licensePlate = selectedOption.value;

      const response = await fetch(`/deleteVan/${licensePlate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      location.reload(); 
    });
  }
}


function deleteElectricianButton() {

  if (document.getElementById("delete-user")) {
      const deleteUserButtonElement = document.getElementById("delete-user");

      deleteUserButtonElement.addEventListener("click", async () => {
      const selectElement = document.querySelector("#dropdown-select-user");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      let employeeId = selectedOption.value;
      
      const response = await fetch(`/deleteUser/${employeeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
      });
      location.reload();
    });
  }
}

function initFunctions() {
  deleteElectricianButton();
  deleteVanButton();
}

initFunctions();