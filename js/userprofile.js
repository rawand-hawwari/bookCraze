class Userprofile {
    constructor(id, firstname, lastname, email, address) {
        this.id = id,
            this.firstname = firstname,
            this.lastname = lastname,
            this.email = email,
            this.address = address

    }

}
function calldata(identity) {
    firstname(identity);
    lastname(identity);

}

calldata(1);
async function firstname(id) {
    const response = await fetch("http://localhost:3000/data");

    const info = await response.json();

    const firstname = info[id - 1].firstname;

    document.querySelector(".firstname2").textContent = firstname;
}
async function lastname(id) {
    const response = await fetch("http://localhost:3000/data");

    const info = await response.json();

    const lastname = info[id - 1].lastname;

    document.querySelector(".lastname2").textContent = lastname;
}
