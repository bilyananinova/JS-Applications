function attachEvents() {

    let submit = document.getElementById('submit');
    submit.addEventListener('click', weather);
}

attachEvents();

async function weather() {

    let location = document.getElementById('location');
    let code = await getCode(location.value);
    location.value = '';

    let [today, upcoming] = await Promise.all([
        getToday(code),
        getUpcoming(code)
    ]);

    let symbols = {
        "Sunny": '&#x2600;',
        "Partly sunny": '&#x26C5;',
        "Overcast": '&#x2601;',
        "Rain": '&#x2614;',
        "Degrees": '&#176;'
    }

    document.getElementById('forecast').style.display = 'block'
    let divCurrent = document.getElementById('current');

    //current forecast
    let divForecast = create('div', 'forecast');
    let spanSymbol = create('span', 'condition symbol', symbols[today.forecast.condition]);
    let spanCondition = create('span', 'condition');
    divCurrent.appendChild(append(divForecast, spanSymbol));

    //current forecast // condition spans
    let spanLoc = create('span', 'forecast-data', today.name);
    let spanDeg = create('span', 'forecast-data', `${today.forecast.low}${symbols['Degrees']}/${today.forecast.high}${symbols['Degrees']}`);
    let spanCon = create('span', 'forecast-data', today.forecast.condition);

    divForecast.appendChild(append(spanCondition, spanLoc, spanDeg, spanCon));

    //upcoming forecast
    let divUpcoming = document.getElementById('upcoming');
    let divForecastInfo = create('div', 'forecast-info');
    upcoming.forecast.forEach(element => {
        let spanUpcoming = create('span', 'upcoming')
        let spanUpcomingSymbol = create('span', 'symbol', symbols[element.condition])
        let spanUpcomingDeg = create('span', 'forecast-data', `${element.low}${symbols['Degrees']}/${element.high}${symbols['Degrees']}`);
        let spanUpcomingCon = create('span', 'forecast-data', element.condition);
        divForecastInfo.appendChild(append(spanUpcoming, spanUpcomingSymbol, spanUpcomingDeg, spanUpcomingCon));
    });

    divUpcoming.appendChild(divForecastInfo);
}

async function getCode(location) {

    try {
        let url = `http://localhost:3030/jsonstore/forecaster/locations`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.find(x => x.name.toLowerCase() == location.toLowerCase()) == false) {
            document.querySelector('.label').textContent = 'Error';
        }

        let code = data.find(x => x.name.toLowerCase() == location.toLowerCase()).code;

        return code

    } catch (err) {
        alert('Error');
    }

}

async function getToday(code) {

    let url = `http://localhost:3030/jsonstore/forecaster/today/` + code;

    let response = await fetch(url);
    let data = await response.json();

    return data;
}

async function getUpcoming(code) {

    let url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code;

    let response = await fetch(url);
    let data = await response.json();

    return data;

}

function create(type, classes, content) {
    let element = document.createElement(type);
    element.className = classes;
    if (content) {
        element.innerHTML = content;
    }
    return element;

}

function append(parent, ...elements) {
    while (elements.length) {
        parent.appendChild(elements.shift())
    }

    return parent
}
