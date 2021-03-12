import { apend } from "./home.js";

let main;
let section

export function setupPost(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let cancelBtn = section.querySelector('.cancel');
    let publiclBtn = section.querySelector('.public');

    cancelBtn.addEventListener('click', clear);
    publiclBtn.addEventListener('click', post);
}

export function showPost() {
    main.innerHTML = '';
    main.appendChild(section)

}

function post(ev) {
    ev.preventDefault();
    let date = new Date().toLocaleString();

    let topic = section.querySelector('input[name=topicName]').value
    let username = section.querySelector('input[name=username]').value
    let postText = section.querySelector('textarea[name=postText]').value

    if (topic != '' || username != '' || postText != '') {
        createPost(topic, username, postText, date)
        section.querySelector('input[name=topicName]').value = ''
        section.querySelector('input[name=username]').value = ''
        section.querySelector('textarea[name=postText]').value = ''
    } else {
        alert('All fielad are reqired!')
    }

};

function clear(ev) {
    ev.preventDefault();

    section.querySelector('input[name=topicName]').value = ''
    section.querySelector('input[name=username]').value = ''
    section.querySelector('textarea[name=postText]').value = ''

};

async function createPost(topic, username, post, date) {

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, username, post,date }),

    });

    if (response.status == 200) {
        let post = await response.json();
        alert('You create new post!');
        let container = document.createElement('div')
        container.className = "topic-container"
        container.id = post._id
        container.innerHTML = `
                    <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <a href="#" class="normal">
                                <h2>${post.topic}</h2>
                            </a>
                            <div class="columns">
                                <div>
                                    <p>Date: <time>${date}</time></p>
                                    <div class="nick-name">
                                        <p>Username: <span>${post.username}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>`

        apend(container)
    } else {
        throw new Error(await response.json());
    }

}
