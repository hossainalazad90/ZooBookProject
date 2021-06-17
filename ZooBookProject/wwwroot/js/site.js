const uri = 'api/Employee';
let employees = [];

function getEmployees() {
    
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const firstNameTextbox = document.getElementById('add-firstName');
    const middleNameTextbox = document.getElementById('add-middleName');
    const lastNameTextbox = document.getElementById('add-lastName');

    const employee = {
        firstName: firstNameTextbox.value.trim(),
        middleName: middleNameTextbox.value.trim(),
        lastName:lastNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
        .then(response => response.json())
        .then(() => {
            getEmployees();
            firstNameTextbox.value = '';
            middleNameTextbox.value = '';
            lastNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getEmployees())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = employees.find(item => item.id === id);
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-firstName').value = item.firstName;
    document.getElementById('edit-middleName').value = item.middleName;
    document.getElementById('edit-lastName').value = item.lastName;       
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),        
        firstName: document.getElementById('edit-firstName').value.trim(),
        middleName: document.getElementById('edit-middleName').value.trim(),
        lastName: document.getElementById('edit-lastName').value.trim()

    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getEmployees())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'Record' : 'Records';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    debugger;
    const tBody = document.getElementById('employees');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(emp => {         
        
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${emp.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${emp.id})`);

        let tr = tBody.insertRow();      

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(emp.firstName);
        td1.appendChild(textNode);
        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(emp.middleName);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(emp.lastName);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    employees = data;
}