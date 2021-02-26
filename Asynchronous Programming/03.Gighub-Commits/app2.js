async function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let ul = document.getElementById('commits');
    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    let response = await fetch(url)
    if (response.ok == false) {
        let li = create('li');
        li.textContent = `Error: ${response.status} (Not Found)`;
        ul.appendChild(li);
    }
    console.log(response);

    let data = await response.json()
    console.log(data);

        data.forEach(element => {
            console.log(element.commit.author.name);
            let li = create('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`;
            ul.appendChild(li);
        });

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
}
