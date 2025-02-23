var selectedRow = null;
var idCounter = 1;

function onFormSubmit(event){
    event.preventDefault();  
    if (validateForm()) {
        var formData = readFormData();
        if (selectedRow === null) {
            insertNewRecord(formData); 
        } else {
            updateRecord(formData); 
        }
        resetForm();  
    }
}

var existingEmails = []; 

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var department = document.getElementById("department").value;
    var salary = document.getElementById("salary").value;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const regexName = /^[A-Za-z\s]+$/;
    const departmentRegex = /^[A-Za-z\s]+$/;
    const salaryRegex = /^[1-9]\d{3,}$/;

    if (name == '' || email == '' || department == '' || salary == '') {
        alert("All fields must be filled out!");
        return false;
    } 
    else if (!regexName.test(name) || name.length < 2) {
        alert("Please enter a valid name. It should be at least 2 characters long and contain only letters and spaces.");
        return false;
    }
    else if (!regexEmail.test(email) || existingEmails.includes(email)) {
        if (!regexEmail.test(email)) {
            alert("Please enter a valid email address.");
        } else {
            alert("This email is already registered.");
        }
        return false;
    }
    else if (!departmentRegex.test(department) || department.length < 2) {
        alert("Department name must be at least 2 characters long and contain only letters and spaces.");
        return false;
    }
    else if (!salaryRegex.test(salary)) {
        alert("Salary must be a valid positive number with at least 4 digits.");
        return false;
    }

    
    existingEmails.push(email);

    return true;
}




function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["department"] = document.getElementById("department").value;
    formData["salary"] = document.getElementById("salary").value;
    // console.log(formData);
    return formData;
}


function insertNewRecord(data) {
    var tableBody = document.getElementById("employee-table-body"); 
    var newRow = tableBody.insertRow(tableBody.rows.length);  

   
    var cell1 = newRow.insertCell(0);  
    cell1.innerHTML = idCounter++;  

    var cell2 = newRow.insertCell(1);  
    cell2.innerHTML = data.name;

    var cell3 = newRow.insertCell(2);  
    cell3.innerHTML = data.email;

    var cell4 = newRow.insertCell(3); 
    cell4.innerHTML = data.department;

    var cell5 = newRow.insertCell(4);  
    cell5.innerHTML = data.salary;

    var cell6 = newRow.insertCell(5);  
    cell6.innerHTML = `<button class="edit-btn" onclick="onEdit(this)">Edit</button> <button class="delete-btn" onclick="onDelete(this)">Delete</button>`;

    // console.log(data);

}




function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;  
    document.getElementById("email").value = selectedRow.cells[2].innerHTML; 
    document.getElementById("department").value = selectedRow.cells[3].innerHTML; 
    document.getElementById("salary").value = selectedRow.cells[4].innerHTML; 
}



function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.department;
    selectedRow.cells[4].innerHTML = formData.salary;
}

function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('employee-table').deleteRow(row.rowIndex);
        resetForm();  
    }
}



function resetForm() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("department").value = '';
    document.getElementById("salary").value = '';
    selectedRow = null;
}
