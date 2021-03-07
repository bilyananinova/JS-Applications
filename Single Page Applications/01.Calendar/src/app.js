let monthNames = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
}

let yearSelect = document.getElementById('years');

let years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

let months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

function displaySection(section) {
    document.body.innerHTML = '';
    document.body.appendChild(section);
}

displaySection(yearSelect);

yearSelect.addEventListener('click', (ev) => {

    if (ev.target.classList.contains('date') || ev.target.classList.contains('day')) {
        ev.stopImmediatePropagation()
        let yearId = `year-${ev.target.textContent.trim()}`
        displaySection(years[yearId]);
    }
})

document.body.addEventListener('click', (ev) => {
    console.log(ev.target);
    if (ev.target.tagName == 'CAPTION') {
        let sectionId = ev.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            displaySection(yearSelect);
        }
        else if (sectionId.includes('month-')) {
            let yearId = `year-${sectionId.split('-')[1]}`;
            displaySection(years[yearId]);
        }
    } else if (ev.target.tagName == 'TD' || ev.target.tagName == 'DIV') {
        let monthName = ev.target.textContent.trim();
        if (monthNames[monthName]) {
            let parent = ev.target.parentNode;
            while (parent.tagName != 'TABLE') {
                parent = parent.parentNode;
            }
            let year = parent.querySelector('caption').textContent.trim();
            let monthId = `month-${year}-${monthNames[monthName]}`;
            displaySection(months[monthId]);
        }
    }
})

