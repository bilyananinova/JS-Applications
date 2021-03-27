let errorBox = document.querySelector('#errorBox');
let loadingBox = document.querySelector('#loadingBox');
let infoBox = document.querySelector('#infoBox');

export function notify(msg) {
    errorBox.innerHTML = `<span>${msg}</span>`;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}

export function loading() {
    loadingBox.style.display = 'block';
    
    setTimeout(() => {
        loadingBox.style.display = 'none';
    }, 1000);
}

export function success(msg) {
    infoBox.innerHTML = `<span>${msg}</span>`
    infoBox.style.display = 'block';

    setTimeout(() => {
        infoBox.style.display = 'none';
    }, 1000);
}