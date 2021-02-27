function solve() {

    let arriveBtn = document.querySelector('#arrive');
    let departBtn = document.querySelector('#depart');
    let info = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        let response = await fetch(url);
        let data = await response.json();

        stop = data;

        info.textContent = `Next stop ${stop.name}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;

    }

    function arrive() {
        info.textContent = `Arrive at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();