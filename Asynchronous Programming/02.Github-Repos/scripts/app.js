function loadRepos() {
	let username = document.getElementById('username').value;
	let ul = document.getElementById('repos');
	let url = `https://api.github.com/users/${username}/repos`;

	let promise = fetch(url);
	// console.log(promise);
	let response = promise.then(response => response.json());
	let data = response.then(data => {
		ul.innerHTML = '';
		data.forEach(element => {
			let li = create('li');
			let a = create('a', `${element.full_name}`, `href=${element.html_url}`);
			li.appendChild(a);
			ul.appendChild(li);

		})

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

	})
}