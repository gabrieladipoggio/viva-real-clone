function searchCity(e) {
    e.preventDefault();
    let state = '';
    let city = '';

    let cities = {
        'rio-de-janeiro': ['rj', 'rio', 'rio de janeiro'],
        'sao-paulo': ['sp', 'sao paulo', 'são paulo']
    }

    let states = {
        'rio-de-janeiro': 'rj',
        'sao-paulo': 'sp',
    }

    let input = document.getElementById('searchInput').value;

    Object.keys(cities).forEach(function (key) {
        cities[key].forEach(typo => {
            if ((input).toLowerCase() == typo) {
                city = key;
                state = states[key];
            }
        })
    });
    getData(state, city).then((res) => renderHTML(state, city, res));
}

document.getElementById('searchInput').addEventListener('focusout', searchCity);