import { getCommentById } from './comments.js'

document.querySelector('#home').addEventListener('click', (ev) => {
    if (ev.target.tagName == 'H2') {
        ev.preventDefault();
        let parent = ev.target.parentNode;
        while (parent.className != 'topic-container') {
            parent = parent.parentNode;
        }
        let id = parent._id;
        debugger
        getCommentById(id)
    }
});

let main;
let section

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export function apend(apendSection) {
    section.appendChild(apendSection)
    showHome()
}

export function showHome() {
    main.innerHTML = '';
    main.appendChild(section)

}
