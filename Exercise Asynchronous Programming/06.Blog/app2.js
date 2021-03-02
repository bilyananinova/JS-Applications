function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);

    document.getElementById('btnViewPost').addEventListener('click', async () => {
        let postId = document.getElementById('posts').value;
        let comments = await getCommentsById(postId);
        createPost(postId, comments);
    });
}

attachEvents();

async function getPosts() {
    let selectMenu = document.getElementById('posts');
    selectMenu.innerHTML = '';

    let postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let postResponse = await fetch(postUrl);
    let posts = await postResponse.json();

    Object.values(posts).forEach(e => {
        selectMenu.appendChild(createOption(e));
    });

}

async function getCommentsById(id) {
    let commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
    let commentsResponse = await fetch(commentsUrl);
    let dataComments = await commentsResponse.json();

    let comments = Object.values(dataComments).filter(p => p.postId == id)
    return comments
}

async function createPost(id, comments) {

    let ul = document.getElementById('post-comments');
    ul.innerHTML = '';

    let responsePost = await fetch('http://localhost:3030/jsonstore/blog/posts/' + id);
    let dataPost = await responsePost.json();

    comments.forEach(c => {
        let li = create('li', [`id=${c.id}`], c.text);
        ul.appendChild(li);
    });

    document.getElementById('post-title').textContent = dataPost.title;
    document.getElementById('post-body').textContent = dataPost.body;
}

function createOption(post) {
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
