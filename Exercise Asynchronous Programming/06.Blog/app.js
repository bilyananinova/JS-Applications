function attachEvents() {

    let btnLoad = document.getElementById('btnLoadPosts');
    let btnView = document.getElementById('btnViewPost');

    btnLoad.addEventListener('click', async () => {
        await getPosts();
    });

    btnView.addEventListener('click', async () => {
        let postId = document.getElementById('posts').value;
        await getCommentsById(postId);
    });
}

attachEvents();

async function getPosts() {
    let url = `http://localhost:3030/jsonstore/blog/posts`;
    let response = await fetch(url);
    let data = await response.json();

    let selectMenu = document.getElementById('posts');
    selectMenu.innerHTML = '';
    Object.values(data).map(createPost).forEach(p => {
        selectMenu.appendChild(p);
    });
}

async function getCommentsById(id) {
    let ul = document.getElementById('post-comments');
    ul.innerHTML = '';    

    let [responseComments, responsePost] = await Promise.all([
        fetch(`http://localhost:3030/jsonstore/blog/comments`),
        fetch('http://localhost:3030/jsonstore/blog/posts/' + id)
    ]);

    let dataComments = await responseComments.json();
    let dataPost = await responsePost.json();

    let comments = Object.values(dataComments).filter(p => p.postId == id).forEach(c => {
        let li = create('li', [`id=${c.id}`], c.text);
        ul.appendChild(li);
    });

    document.getElementById('post-title').textContent = dataPost.title;
    document.getElementById('post-body').textContent = dataPost.body;

}

function createPost(post) {
    return create('option', [`value=${post.id}`], post.title);
}

function create(type, attributes, content) {
    let element = document.createElement(type);

    if (attributes) {
        while (attributes.length) {
            let [type, value] = attributes.shift().split('=');
            element.setAttribute(type, value);
        }
    }

    if (content) {
        element.innerHTML = content;
    }

    return element;

}