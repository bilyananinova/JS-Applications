import { setupHome, showHome } from './home.js';
import { setupPost, showPost } from './posts.js';
import { setupContent, showContent } from './comments.js';

let main = document.querySelector('main');

setupSection('home', setupHome);
setupSection('topic-box', setupPost);
setupSection('theme-content', setupContent);
setupNavigation()


showHome()
let links = {
    'homeLink': showHome,
    'topicLink': showPost,
    'public': showContent,
}


function setupSection(sectionId, setup) {
    let section = document.getElementById(sectionId)
    setup(main, section)
}

function setupNavigation() {
    document.querySelector('#topicLink').addEventListener('click', (ev) => {
        ev.preventDefault();

        let view = links[ev.target.id];
        if (typeof view == 'function') {
            view();
        }

    })

    document.querySelector('#homeLink').addEventListener('click', (ev) => {
        ev.preventDefault();

        let view = links[ev.target.id];
        if (typeof view == 'function') {
            view();
        }

    })

}

