import { showComment } from './comments.js'

let main;
let section

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.addEventListener('click', (ev) => {
        if (ev.target.tagName == 'H2') {
            ev.preventDefault();
            let parent = ev.target.parentNode;
            while (parent.className != 'topic-container') {
                parent = parent.parentNode;
            }
            let id = parent.id;
            showComment(id)
        }
    });
}


export function showHome() {
    main.innerHTML = '';
    main.appendChild(section)

}

export function apend(apendSection) {
    document.querySelector('.topic-title').appendChild(apendSection)
    showHome()
}


