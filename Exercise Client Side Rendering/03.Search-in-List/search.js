import { render } from '../node_modules/lit-html/lit-html.js';
import createTemplate from './temp.js'
import { towns } from './towns.js';

document.querySelector('button').addEventListener('click', search);
let div = document.querySelector('#towns');
let matches = document.querySelector('#result');

function search() {

   let input = document.querySelector('#searchText').value
   let result = createTemplate(towns, input);
   render(result, div);

   let counts = towns.filter(t => input && t.toLowerCase().includes(input.toLowerCase())).length;
   if (counts) {
      matches.textContent = `${counts} matches fount`;
   } else {
      '0 matches found';
   }
}

search()



