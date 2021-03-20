import { render } from '../node_modules/lit-html/lit-html.js'
import create from './templates.js'

let div = document.querySelector('div')
let input = document.querySelector('[type=text]')
start()

async function start () {
    document.querySelector('[type=submit]').addEventListener('click', (ev) => addItem(ev, list))
    let towns = await (await fetch('http://localhost:3030/jsonstore/advanced/dropdown')).json()
    let list = Object.values(towns)
    update(list)
    
}

async function update(list) {
    let result = create(list)
    render(result, div)
}

async function addItem(ev, list) {
    ev.preventDefault() 

    let newItem = {
        text: input.value
    }

    let response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)

    })
    let data = await response.json()

    list.push(data)
    input.value = ''
    update(list)
}
