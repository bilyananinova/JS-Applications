export async function getCommentByPost(id) {

    let request = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`)

    if (request.ok) {
        let data = await request.json();
        return data
    } else {
        alert("Something went wrong!");
    }
}

let main;
let section;

export function setupContent(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showContent(id) {
    main.innerHTML = '';

    let form = section.querySelector('form');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let commentContent = formData.get('commentText')
        let username = formData.get('username')

        if (commentContent != '' || username != '') {

            let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ commentContent, username }),

            });

            let data = await response.json()
console.log(data);
            let comment = document.createElement('div')
            comment.className = 'comment'
            comment.innerHTML = `
                <header class="header">
                    <p><span>${data.username}</span> posted on <time>2020-10-10 12:08:28</time></p>
                </header>
                <div class="comment-main">
                    <div class="userdetails">
                        <img src="./static/profile.png" alt="avatar">
                                </div>
                                <div class="post-content">
                                    <p>${data.commentContent}</p>
                                </div>
                            </div>
                            <div class="footer">
                                <p><span>5</span> likes</p>
                            </div>
                        </div>
                        <div id="contentCommnets">
                        </div>
                        
                        <div class="answer-comment">
                            <p><span>currentUser</span> comment:</p>
                            <div class="answer">
                                <form>
                                    <textarea name="commentText" id="comment" cols="30" rows="10"></textarea>
                                    <div>
                                        <label for="username">Username <span class="red">*</span></label>
                                        <input type="text" name="username" id="username">
                                    </div>
                                    <button>Post</button>
                                </form>
                            </div>
                        </div>`
            section.innerHTML = ''
            section.prepend(comment)

            ev.target.reset()
        }
    })

    main.appendChild(section)
}
