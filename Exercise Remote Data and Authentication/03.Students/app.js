window.addEventListener('load', loadStudent);
document.getElementById('form').addEventListener('submit', addNewStudentByForm);

let tbody = document.getElementById('tbody');
let url = 'http://localhost:3030/jsonstore/collections/students';

async function loadStudent() {
    tbody.innerHTML = ''
    let response = await fetch(url);
    let data = await response.json();
    Object.values(data).forEach(v => {
        createStudent(v.firstName, v.lastName, v.facultyNumber, v.grade);
    });
}

function createStudent(firstName, lastName, facultyNumber, grade) {
    let tr = document.createElement('tr');

    let tdFName = document.createElement('td');
    tdFName.textContent = firstName;
    tr.appendChild(tdFName);

    let tdLName = document.createElement('td');
    tdLName.textContent = lastName;
    tr.appendChild(tdLName);

    let tdNumber = document.createElement('td');
    tdNumber.textContent = facultyNumber;
    tr.appendChild(tdNumber);

    let tdGrade = document.createElement('td');
    tdGrade.textContent = grade;
    tr.appendChild(tdGrade);

    tbody.appendChild(tr);

}

async function addNewStudentByForm(ev) {
    ev.preventDefault();
    
    let data = new FormData(ev.target);

    let firstName = data.get('firstName');
    let lastName = data.get('lastName');
    let facultyNumber = data.get('facultyNumber');
    let grade = data.get('grade');

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return alert('All fields are required!');
    }

    postNewStudent({ firstName, lastName, facultyNumber, grade });
    [...document.getElementsByTagName('input')].forEach(i => { i.value = '' });
}

async function postNewStudent(studentInfo) {
    let response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentInfo)
    });
    let result = await response.json();
    createStudent(result.firstName, result.lastName, result.facultyNumber, result.grade);
    loadStudent();
}
