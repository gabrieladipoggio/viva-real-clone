function getData(state, city) {
    return fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`).then(res => {
        if(res.status === 200) {
            return res.json()
        } else {
            return { status : res.status }
        }
    }).then(res => {
        return res
    })
}

function searchCity() {
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


    let input = document.getElementById('search').value;

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

function convertState(state) {
    return state.toUpperCase();
}

function convertCity(city) {
    return city.split('-').map(word => {
        if(word == 'sao'){
            word = 'são'
        }
        word = word[0].toUpperCase() + word.slice(1);
        return word
    }).join(' ')
}

function translateAmenity(amenity){
    let dictionary = {
        'CINEMA':'Cinema', 
        'GYM': 'Academia',

    }
    return dictionary[amenity]
}

function createCard(listing) {
    let cardMain = document.createElement('div');
    let img = document.createElement('img');
    let divWrapper = document.createElement('div');
    let spanAddress = document.createElement('span');
    let divName = document.createElement('div');
    let divInfoWrapper = document.createElement('div');
    let spanInfo = document.createElement('span');
    let divAmenitiesWrapper = document.createElement('div');
    let spanAmenities = document.createElement('span');
    let divPricingInfoWrapper = document.createElement('div');
    let divPricingInfo = document.createElement('div');

    let url = listing.medias[0].url;
    let address = listing.listing.address


    img.className = 'result-img';
    img.src = `${url}`;
    cardMain.appendChild(img);

    cardMain.className = 'result-card';
    cardMain.appendChild(divWrapper);


    divWrapper.className = 'result-info';
    // divWrapper.innerText = `${listing.listing.description}`
    divWrapper.appendChild(spanAddress);
    divWrapper.appendChild(divName);
    divWrapper.appendChild(divInfoWrapper);
    divInfoWrapper.appendChild(spanInfo);
    divWrapper.appendChild(divAmenitiesWrapper);
    // divAmenitiesWrapper.appendChild(spanAmenities);

    spanAddress.innerText = `${address.street}, ${address.streetNumber} - ${address.neighborhood}, ${address.city} - ${address.stateAcronym}`;

    divName.innerText = listing.listing.title;
    divInfoWrapper.className = 'info-wrapper';
    spanInfo.innerText = `${listing.listing.usableAreas}m² ${listing.listing.bedrooms} Quartos ${listing.listing.bathrooms} Banheiros ${listing.listing.parkingSpaces} Vaga`;

    // listing.amenities.forEach(amenity => {
    //     //    divAmenitiesWrapper.appendChild(spanAmenities);

    // })

    spanAmenities.className = 'span-amenities';


    divWrapper.appendChild(divPricingInfoWrapper);
    divPricingInfoWrapper.className = 'pricing-wrapper';
    divPricingInfoWrapper.appendChild(divPricingInfo);
    divPricingInfo.className = 'pricing-info';

    divPricingInfo.innerHTML = `${listing.pricingInfos}`

    return cardMain
}

function renderSidebar(state, city) {
    let nameSearchBar = document.getElementById('name-delete');
    let p = document.createElement('p');
    let span = document.createElement('span');
    nameSearchBar.innerHTML = ''
    span.className = 'material-icons';
    span.innerText = 'close';

    nameSearchBar.appendChild(p);
    p.innerText = `${city} - ${state}`;
    nameSearchBar.appendChild(span);
}

function renderMainSection(state, city, res) {
    let mainDiv = document.getElementById('main-content');
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.className = 'material-icons';
    span.innerText = 'close';
    
    mainDiv.innerHTML = `<span>${res.search.totalCount}</span> Apartamentos à venda disponíveis em ${city} - ${state}`
    mainDiv.appendChild(div);
    div.className = 'selected-city';
    div.innerText = `${city} - ${state}`;
    div.appendChild(span)
}


function renderBreadcrumbs(state, city) {
    let breadcrumbState = document.getElementById('breadcrumb-state');
    let breadcrumbCity = document.getElementById('breadcrumb-city');
    let dividers = document.querySelectorAll('.divider');

    dividers.forEach((divider) => {
        divider.style.visibility = 'visible';
    })
    breadcrumbState.innerText = `${state}`
    breadcrumbCity.innerText = `Apartamentos à venda em ${city}`
}

function renderPageNotFound(status){
    let mainDiv = document.getElementById('main-content');
    let div = document.createElement('div');
    let h4 = document.createElement('h4');
    let span = document.createElement('span');
    let p = document.createElement('p');

    div.className = 'error-wrapper';
    mainDiv.appendChild(div);

    h4.className = 'error-msg'
    h4.innerText = 'Ooops! Algo deu errado na sua busca.';
    mainDiv.appendChild(h4);

    span.className = 'error-status'
    span.innerText = `status ${status}`
    mainDiv.appendChild(span);

    p.className = 'error-msg'
    p.innerText = 'Por favor, tente novamente.'
    mainDiv.appendChild(p);
}


function renderHTML(state, city, res) {
    
    console.log(res)
    if(res.status){
        renderPageNotFound(res.status)
    } else {
        // Render the framework around the list of cards
    state = convertState(state);
    city = convertCity(city);
    renderSidebar(state, city)
    renderMainSection(state, city, res);
    renderBreadcrumbs(state, city)
    let mainDiv = document.getElementById('main-content');

    // For each listing, create and append a card to the DOM
    res.search.result.listings.forEach(listing => {
        let card = createCard(listing);
        mainDiv.appendChild(card)
    })
}
}

