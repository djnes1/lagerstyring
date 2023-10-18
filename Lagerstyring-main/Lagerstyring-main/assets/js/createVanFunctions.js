function createVanButton() {
  const createVanButtonElement = document.getElementById("button-create-van");
  const nrInputElement = document.getElementById("input-van-nr");
  const lpInputElement = document.getElementById("input-licensePlate");
  const errVanNrElement = document.getElementById("p-err-van-nr");
  const errLicensePlateElement = document.getElementById("p-err-licensePlate");

  const errNotANr = "Forkert input: Vognnummer må ikke indholde bogstaver";
  const errNot7Chars =
    "Forkert input: Registreringsnummer skal være 7 karakterer.";
  const errNotCorrectFormat =
    "Forkert input: Registreringsnummer er ikke i korrekt format.";
  const errVanNumberInSystem =
    "Vognnummeret er allerede registreret i systemet";
  const errLicensePlateInSystem =
    "Registreringsnummeret er allerede i systemet";

  createVanButtonElement.addEventListener("click", async () => {
    //.split().join() er for at fjerne alle mellemrum i inputtet
    let inputError = false;
    const nrInputValue = nrInputElement.value.trim();
    const lpInputValue = lpInputElement.value.split(" ").join("").toUpperCase();

    errVanNrElement.innerText = "";
    errLicensePlateElement.innerText = "";

    if (containLetters(nrInputValue)) {
      errVanNrElement.innerText += errNotANr + "\n";
      inputError = true;
      console.log(1111);
    }
    if (lpInputValue.length !== 7) {
      errLicensePlateElement.innerText += errNot7Chars + "\n";
      inputError = true;
      console.log(1112);
    }
    if (!checkLicensePlate(lpInputValue)) {
      errLicensePlateElement.innerText += errNotCorrectFormat + "\n";
      inputError = true;
    }

    // if (await vanNumberInSystem(nrInputElement.value)) {
    //   errVanNrElement.innerText += errVanNumberInSystem + "\n";
    //   inputError = true;
    //   console.log(1114);
    // }
    // if (await licensePlateInSystem(formatLicensePlate(lpInputValue))) {
    //   errLicensePlateElement.innerText += errLicensePlateInSystem + "\n";
    //   inputError = true;
    //   console.log(1115);
    // }

    if (!inputError) {
      const licensePlate = formatLicensePlate(lpInputValue);
      const vanNr = nrInputValue;

      await fetch("/van", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licensePlate: licensePlate, vanNumber: vanNr }),
      });
    }
  });
}

async function licensePlateInSystem(licensePlate) {
  let inSystem = false;

  console.log(licensePlate);

  if (licensePlate.length > 0) {
    const response = await fetch(`/vans/licenseplate/${licensePlate}`, {
      method: "GET",
    });

    const json = await response.json();

    if (json.van) {
      inSystem = true;
    }
  }

  return inSystem;
}

async function vanNumberInSystem(vanNumber) {
  let inSystem = false;

  if (vanNumber.length > 0) {
    const response = await fetch(`/vans/vanNumber/${vanNumber}`, {
      method: "GET",
    });

    const json = await response.json();
    console.log(json);

    if (json.van) {
      inSystem = true;
    }
  }

  return inSystem;
}

function containLetters(string) {
  return string.toLowerCase().match(/[a-å]/);
}

function checkLicensePlate(licensePlate) {
  const lpSplits = splitLicensePlate(licensePlate);
  const regExLetters = /^[A-Z]+$/;
  const regExDigits = /^[0-9]+$/;
  /*
    regular expression
    /^[a-z]+$/
    søger en streng igennem for det givne udtryk
    i dette tilfælde om den indeholder bogstaver fra a-z
    ^ - betyder at den leder i starten af strengen
    $ - betyder at den leder i slutningen af strengen
    når ^ og $ bliver brugt sammen betyder det at hele strengen skal matche udtrykket
    + - betyder at strengen kan være længere end 1
  */
  if (
    !regExLetters.test(lpSplits[0]) ||
    !regExDigits.test(lpSplits[1]) ||
    !regExDigits.test(lpSplits[2])
  ) {
    return false;
  }

  return true;
}

function splitLicensePlate(licensePlate) {
  let splits = [];

  const letters = licensePlate.substring(0, 2);
  const firstDigits = licensePlate.substring(2, 5);
  const lastDigits = licensePlate.substring(5);

  splits.push(letters);
  splits.push(firstDigits);
  splits.push(lastDigits);

  return splits;
}

function formatLicensePlate(licensePlate) {
  const splits = splitLicensePlate(licensePlate);

  const formattetLicensePlate = splits.join(" ");
  return formattetLicensePlate;
}

function initFunctions() {
  createVanButton();
}

initFunctions();
