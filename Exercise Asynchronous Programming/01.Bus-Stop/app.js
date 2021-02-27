async function getInfo() {
    let stop = document.querySelector('#stopId');
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stop.value}`;
    let stopName = document.querySelector('#stopName');
    let buses = document.querySelector('#buses');

    try {
        let response = await fetch(url);
        let data = await response.json();
        stopName.textContent = data.name;
        buses.innerHTML = '';
        stop.value = '';
        Object.entries(data.buses).forEach(element => {
            let li = document.createElement('li');
            li.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
            buses.appendChild(li);
        });


    } catch (err) {
        stopName.textContent = 'Error'
    }

}
