import * as api from './api.js'

let host = 'http://localhost:3030'
api.settings.host = host

export let login = api.login
export let register = api.register
export let logout = api.logout

export async function getRecipes() {
    return await api.get(host + '/data/recipes?select=' + encodeURIComponent('_id,name,img'))
}

export async function getRecipeById(id) {
    return await api.get(host + '/data/recipes/' + id)
}

export async function createRecipe(recipe) {
    return await api.post(host + '/data/recipes', recipe)
}

export async function editRecipeById(id, recipe) {
    return await api.put(host + '/data/recipes/' + id, recipe)
}

export async function deleteRecipeById(id) {
    return await api.del(host + '/data/recipes/' + id)
}