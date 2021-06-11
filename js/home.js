let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    createInnerHtml();
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('addressBookList') ?
        JSON.parse(localStorage.getItem('addressBookList')) : [];
} 

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
    if (addressBookList.length == 0) {
        return;
    }
    let innerHtml = `${headerHtml}`;
    for (let index = 0; index < addressBookList.length; index++) {
        innerHtml = `${innerHtml}
            <tr>
                <td>${addressBookList[index]._name}</td>
                <td>${addressBookList[index]._address}</td>
                <td>${addressBookList[index]._city}</td>
                <td>${addressBookList[index]._state}</td>
                <td>${addressBookList[index]._zipCode}</td>
                <td>${addressBookList[index]._phoneNumber}</td>
                <td>
                    <img id="${index}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${index}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    addressBookList.splice(parseInt(node.id), 1);
    localStorage.setItem("addressBookList", JSON.stringify(addressBookList));
    createInnerHtml();
}

const update = (node) => {
    const currentUri = window.location.href;
    const addUri = currentUri.replace("home", "addPerson");
    window.location.replace(addUri + "?index=" + node.id);
}
