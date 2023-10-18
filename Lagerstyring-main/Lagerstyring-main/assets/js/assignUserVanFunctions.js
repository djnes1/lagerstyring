

function assignUserToVan() {
  const assignButton = document.getElementsByClassName("assign")[0]

  const selectVanDropdownElement = document.getElementById("dropdown-select-van");
  const selectUserDropdownElement = document.getElementById("dropdown-select-user");

  if(selectUserDropdownElement && selectVanDropdownElement){
    assignButton.addEventListener("click", async () =>{
      const selectedVanIndex = selectVanDropdownElement.selectedIndex
      const selectedVanLicensePlateId = selectVanDropdownElement.options[selectedVanIndex].id
      const selectedVanLicensePlate = selectedVanLicensePlateId.split('-')[1]

      const selectedUserIndex = selectUserDropdownElement.selectedIndex
      const selectedUserEmployeeIdId = selectUserDropdownElement.options[selectedUserIndex].id
      const selectedUserEmployeeId = selectedUserEmployeeIdId.split('-')[1]

      await fetch(`/updateVan/${selectedVanLicensePlate}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            licensePlate: selectedVanLicensePlate, 
            employeeId: selectedUserEmployeeId
          }),
      })
    })
  }
}


function initFunctions() {
  assignUserToVan();
}

initFunctions();