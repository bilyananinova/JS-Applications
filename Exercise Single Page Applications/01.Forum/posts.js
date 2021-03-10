import { apend } from "./home.js";

async function createPost(topic, username, post) {

    let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, username, post }),
    
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
                                    <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                                    <div class="nick-name">
                                        <p>Username: <span>${post.username}</span></p>
                                    </div>
                                </div>
                                <div class="subscribers">
                                    <p>Subscribers: <span>456</span></p>
                                </div>
                            </div>
                        </div>`

        apend(container)
    } else {
        throw new Error(await response.json());
    }

}

let main;
let section

export function setupPost(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    [...section.querySelectorAll('button')].forEach(b => b.addEventListener('click', (ev) => {
        if (ev.target.className == 'public') {
            let form = section.querySelector('form');

            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const formData = new FormData(ev.target);

                let topic = formData.get('topicName')
                let username = formData.get('username')
                let postText = formData.get('postText')

                console.log(topic);
                console.log(username);
                console.log(postText);

                if (topic != '' || username != '' || postText != '') {
                    createPost(topic, username, postText, section)

                    ev.target.reset()
                } else {
                    ev.target.reset()
                }
            });
        } else if (ev.target.className == 'cancel') {
            showHome()
        }
    }))

}

export function showPost() {
    main.innerHTML = '';
    main.appendChild(section)

}