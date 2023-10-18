export default class Company {
    constructor(name, cvr, contactpersonName, contactpersonNumber) {
        this.name = name;
        this.cvr = cvr;
        this.contactpersonName = contactpersonName;
        this.contactpersonNumber = contactpersonNumber;
    }

    toJSON() {
        const json = {
            name: this.name, 
            cvr: this.cvr, 
            contactpersonName: this.contactpersonName,
            contactpersonNumber: this.contactpersonNumber
        }
        return json;
    }
}