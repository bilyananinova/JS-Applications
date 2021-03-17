import { html, render } from '../node_modules/lit-html/lit-html.js'

let input = document.querySelector('#searchField');
let tbody = document.querySelector('tbody');


getStudents()
async function getStudents() {
   document.querySelector('#searchBtn').addEventListener('click', () => {
      update(students, input.value)
   });

   let response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data = await response.json();
   let students = Object.values(data)
   update(students)
}

function update (list, match = '') {
   let result = list.map(s => create(s, compare(s, match)));

   render(result, tbody);
}

function compare(student, input = '') {
  return  Object.values(student).some(s => (input && s.toLowerCase().includes(input.toLowerCase())))
}

let create = (student, select) => html`
<tr class=${select ? 'select' : ''}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`