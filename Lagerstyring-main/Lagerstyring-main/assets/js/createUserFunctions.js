
// POST fetch til 'user'


function createUserButton() {
  const createUserButtonElement = document.getElementById('create-user-btn')
  const nameInputElement = document.getElementById('input-name')
  const employeeIdInputElement = document.getElementById('input-employeeId');
  const usernameInputElement = document.getElementById('input-username');
  const passwordInputElement = document.getElementById('input-password');
  const repeatPasswordInputElement = document.getElementById('input-repeat-password');
  const radioElements = document.getElementsByClassName('radio-user-role');
  const errMessegeElement = document.getElementById('err-messege');

  const errNotSamePasswords = "Password ikke ens"
  const errEmptyFields = "Et eller flere felter er tomme";
  const errEmployeeIdNotNumber = "Medarbejder nr skal være et tal"
  const errEmployeeIdcontainsLetters = "Medarbejder nr indholder et eller flere bogstaver";
  const errNoRoleSelected = "Der er ikke valgt en systemrolle";
  const errUserInSystem = "Brugernavnet er optaget";
  const errDigitsInName = "Der må ikke være tal i navn";
  const errEmployeeIdInUse = "Medarbejdernummer er optaget"
  
  createUserButtonElement.addEventListener('click', async () => {

    const name = nameInputElement.value;
    const employeeId = employeeIdInputElement.value;
    const username = usernameInputElement.value.toLowerCase();
    const password = passwordInputElement.value;
    const repeatPassword = repeatPasswordInputElement.value;
    const role = getSelectedRole();
    console.log(role)

    
    errMessegeElement.innerText = '';
    let inputErr = false;

    if (!radioIsSelected()) {
      inputErr = true
      errMessegeElement.innerText += errNoRoleSelected + "\n";
    }
    if (password !== repeatPassword) {
      inputErr = true;
      errMessegeElement.innerText += errNotSamePasswords + '\n';
    }
    if ( emptyFields() ) {
      inputErr = true;
      errMessegeElement.innerText += errEmptyFields + "\n";
    }
    if (containsLetter(employeeId)) {
      inputErr = true;
      errMessegeElement.innerText += errEmployeeIdcontainsLetters + '\n'
      errMessegeElement.innerText += errEmployeeIdNotNumber + '\n';
    }
    if ( (await usernameInUse(username)) ) {
      inputErr = true;
      errMessegeElement.innerText += errUserInSystem + '\n';
    }
    if (containsDigits(name)) {
      inputErr = true;
      errMessegeElement.innerText += errDigitsInName + '\n';
    }
    if ( (await employeeIdInUse(employeeId)) ) {
      inputErr = true;
      errMessegeElement.innerText += errEmployeeIdInUse + '\n'
    }

    if (!inputErr) {

      fetch('/user', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ 
          name: name,
          employeeId: employeeId,
          username: username,
          password: password,
          role: role
        })
      })

      console.log("Bruger oprettet!")
    }


  })
}

function containsLetter(string) {
  return string.toLowerCase().match(/[a-å]/)
}

function containsDigits(string) {
  return string.toLowerCase().match(/[0-9]/)
}

async function employeeIdInUse(employeeId) {
  let inUse = false;

  if (employeeId.length > 0) {
    const response = await fetch(`/users/employeeid/${employeeId}`, {
      method: "GET"
    });

    const json = await response.json();

    if (json.user) {
      inUse = true;
    }
  }

  return inUse;
}

async function usernameInUse(username) {
  let inUse = false;

  if (username.length > 0) {
    const response = await fetch(`/users/username/${username.toLowerCase()}`, {
      method: "GET"
    });
  
    const json = await response.json();
    if (json.user) {
      inUse = true;
    }
  }

  return inUse
}

function getSelectedRole() {
  const radioButtons = document.getElementsByClassName('radio-user-role');
  let selected = undefined
  for (const r of radioButtons) {
    if (r.checked) {
      selected = r.value;
    }
  }
  return selected;
}

function emptyFields() {
  const fields = document.getElementsByTagName('input');
  let empty = false;
  for(const f of fields) {

    if (f.value.trim().length < 1) {
      empty = true;
    }

  }
  return empty;
}



function radioIsSelected() {
  const radioButtons = document.getElementsByClassName('radio-user-role')

  let selected = false;
  for(const r of radioButtons) {
    if (r.checked) {
      selected = true;
    }
  }

  return selected;
}

function initFunctions() {
  createUserButton();
}

initFunctions();