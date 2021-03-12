let main;
let section;

export function setupComment(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector('button').addEventListener('click', setComment)
}

export async function showComment(id) {
    let post = await getPostById(id)
    let postInfo = createPostInfo(post)

    main.innerHTML = ''
    main.appendChild(postInfo)
    main.appendChild(section)

}

async function setComment(ev) {
    ev.preventDefault()

    let username = document.getElementById('username').value
    let comment = document.getElementById('comment').value

    if (username === '' || comment === '') {
        return alert('All fields are required!');
    }

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, comment })
    });

    createCommentsCard(await response.json())

    document.getElementById('username').value = ''
    document.getElementById('comment').value = ''
}

function createCommentsCard(data) {
    let comment = document.createElement('div')
    comment.className = 'comment'
    comment.innerHTML = `
        <header class="header">
            <p><span>${data.username}</span></p>
        </header >
        <div class="comment-main">
            <div class="userdetails">
                <img src="./static/profile.png" alt="avatar">
            </div>
                <div class="post-content">
                    <p>${data.comment}</p>
                </div>
        </div>
        <div class="footer">
        </div>`
    section.prepend(comment)
    return section

}

async function getPostById(id) {
    let url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
    let request = await fetch(url);
    let data = await request.json();

    return data;
}

function createPostInfo(data) {
    let element = document.createElement('div')
    element.className = 'theme-content'
    element.innerHTML = `
    <div class="theme-title">
        <div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${data.topic}</h2>
                <p>Date: <time>${data.date}</time></p>
            </div>
        </div>
    </div>`
    return element
}


