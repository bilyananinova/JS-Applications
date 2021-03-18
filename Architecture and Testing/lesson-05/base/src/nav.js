
export function createNavigation(main, nav) {

    const views = {    }

    const links = {   }

    setupNavigation()

    let navigation = {
        setUserNav,
        registerView,
        goTo
    }

    return navigation

    async function goTo(name) {
        main.innerHTML = '';
        let section = await views[name]
        main.appendChild(section)
    }

    function registerView(name, section, setup, navId) {
        let view = setup(section)

        views[name] = view

        if (navId) {
            links[navId] = name
        }
    }

    function setupNavigation() {
        setUserNav()
        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                const handler = links[ev.target.id];
                if (handler) {
                    ev.preventDefault();
                    handler();
                }
            }
        });
    }

    function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(a => a.id == targetId ? a.classList.add('active') : a.classList.remove('active'));
    }


    function setUserNav() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }
}