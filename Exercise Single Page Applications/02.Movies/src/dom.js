export function create(type, attributes, content) {
    let element = document.createElement(type);
    if (attributes) {
        while (attributes.length) {
            let [type, value] = attributes.shift().split('=')
            element.setAttribute(type, value);
        }
    }
    if (content) {
        element.innerHTML = content;
    }
    return element;

}