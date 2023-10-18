export default class User {
  constructor(name, employeeId, username, password, role) {
    this.name = name;
    this.employeeId = employeeId;
    this.username = username;
    this.password = password;
    this.role = role;
    // this.van = van ? van : null;
  }

  addVan(newVan) {
    if (!van) {
      this.van = newVan;
    }
  }

  removeVan(van) {
    if (van) {
      this.van = null;
    }
  }

  toJSON() {
    const json = {
      name: this.name,
      employeeId: this.employeeId,
      username: this.username,
      password: this.password,
      role: this.role,
      // van: this.van,
    };
    return json;
  }

  changeLicenseplate(newLicenseplate) {
    this.licenseplate = newLicenseplate;
  }
}
