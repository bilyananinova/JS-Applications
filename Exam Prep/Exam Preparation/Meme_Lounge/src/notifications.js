let errorBox = document.querySelector('#errorBox');

export function notify(msg) {
    console.log(errorBox);
    errorBox.innerHTML = `<span>${msg}</span>`;
    
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000)
}