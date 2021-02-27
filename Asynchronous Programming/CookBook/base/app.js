window.addEventListener('load', async () => {
    let main = document.querySelector('main');
    let recipes = await generateRecipe();
    recipes.forEach(element => {
        let r = createRecipe(element);
        main.appendChild(r);
    });
});

async function generateRecipe() {
    let url = `http://localhost:3030/jsonstore/cookbook/recipes`;
    let response = await fetch(url);
    let data = await response.json();
    return Object.values(data);
};

async function generateRecipeById(id, parent) {
    let url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    let response = await fetch(url);
    let data = await response.json();

    let article = create('article');
    let h2 = create('h2', data.name);
    let divBand = create('div', '', 'class=band');
    let divThumb = create('div', '', 'class=thumb');
    let img = create('img');
    img.src = data.img;

    divThumb.appendChild(img);
    divBand.appendChild(divThumb);
    article.appendChild(h2);
    article.appendChild(divBand);

    let divIngredients = create('div', '', 'class=ingredients')
    let h3 = create('h3', 'Ingredients:')
    let ul = create('ul')
    data.ingredients.forEach(i => {

        let li = create('li', i)
        ul.appendChild(li)
    })

    divIngredients.appendChild(ul);
    divBand.appendChild(h3);
    divBand.appendChild(divIngredients);

    let divDescription = create('div', '', 'class=description')
    let h3D = create('h3', 'Preparation:')
    divDescription.appendChild(h3D);

    data.steps.forEach(s => {
        let p = create('p', s)
        divDescription.appendChild(p)
    })

    article.appendChild(divDescription);

    parent.replaceWith(article, parent)
};

function createRecipe(recipe) {
    let article = create('article', '', 'class=preview');
    let divTitle = create('div', '', 'class=title');
    let h2 = create('h2', recipe.name);
    divTitle.appendChild(h2);
    article.appendChild(divTitle);
    let divImg = create('div', '', 'class=small');
    let img = create('img');
    img.src = recipe.img;

    divImg.appendChild(img);
    article.appendChild(divImg);
    article.addEventListener('click', async () => {
        generateRecipeById(recipe._id, article);
    })
    return article;
}

function create(type, content, attribute) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (attribute) {
        let [typeAtr, valueAtr] = attribute.split('=');
        if (typeAtr == 'class') {
            element.classList.add(valueAtr);
        } else {
            element.setAttribute(typeAtr, valueAtr);
        }
    }

    return element;

}