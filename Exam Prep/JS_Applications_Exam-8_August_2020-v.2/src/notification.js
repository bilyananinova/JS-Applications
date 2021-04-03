
let notifications = document.getElementsByClassName('notifications')

export function errorBox(msg) {
    let box = notifications[0]

    box.innerHTML = `<p class="notification-message" id="errorBox">${msg}</p>`
    box.style.display = '';

    setTimeout(() => {
        box.style.display = 'none';
    }, 1000)
}

export function successBox(msg) {
    let box = notifications[1];
    
    box.innerHTML = `<p class="notification-message" id="successBox">${msg}</p>`
    box.style.display = '';

    setTimeout(() => {
        box.style.display = 'none';
    }, 1000)
}

