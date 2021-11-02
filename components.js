function createCard(listing) {
    let url = listing.medias[0].url;
    let address = listing.listing.address

    let cardMain = document.createElement('div');
    let img = document.createElement('img');
    let cardWrapper = document.createElement('div');

    img.className = 'result-img';
    img.src = `${url}`;
    cardMain.appendChild(img);

    cardMain.className = 'result-card';
    cardMain.appendChild(cardWrapper);
    cardWrapper.className = 'result-info';

    let infoWrapper = document.createElement('div');
    let divAddress = document.createElement('div');
    cardWrapper.appendChild(infoWrapper);
    infoWrapper.appendChild(divAddress);
    infoWrapper.className = 'info-wrapper'
    divAddress.innerText = `${address.street}, ${address.streetNumber} - ${address.neighborhood}, ${address.city} - ${address.stateAcronym}`;

    let divName = document.createElement('div');
    infoWrapper.appendChild(divName);
    divName.innerText = listing.listing.title;

    let divAreas = document.createElement('div');
    infoWrapper.appendChild(divAreas);
    divAreas.innerHTML = `<span>${listing.listing.usableAreas}</span>m² <span>${listing.listing.bedrooms}</span> Quartos <span>${listing.listing.bathrooms}</span> Banheiros <span>${listing.listing.parkingSpaces}</span> Vaga`;

    let divAmenitiesWrapper = document.createElement('div');
    divAmenitiesWrapper.className = 'span-amenities';

    infoWrapper.appendChild(divAmenitiesWrapper);
    listing.listing.amenities.forEach(amenity => {
        let spanAmenity = document.createElement('span');
        amenity = translateAmenity(amenity);
        divAmenitiesWrapper.appendChild(spanAmenity);
        spanAmenity.innerText = amenity
    })

    let divPricingInfoWrapper = document.createElement('div');
    let divPricingInfo = document.createElement('div');
    infoWrapper.appendChild(divPricingInfoWrapper);
    divPricingInfoWrapper.appendChild(divPricingInfo);
    divPricingInfoWrapper.className = 'pricing-info';

    let condoFee = listing.listing.pricingInfos[0].monthlyCondoFee;
    let price = listing.listing.pricingInfos[0].price;
    divPricingInfo.innerHTML = `<p>${formatPrice(price)}</p> <p>Condomínio: <span>${formatPrice(condoFee)}</span> </p>`

    return cardMain
}

function renderSidebar(state, city) {
    let nameSearchBar = document.getElementById('name-delete');
    nameSearchBar.innerHTML = ''

    if (state && city) {
        let p = document.createElement('p');
        let span = document.createElement('span');
        nameSearchBar.innerHTML = ''
        span.className = 'material-icons';
        span.innerText = 'close';

        nameSearchBar.appendChild(p);
        p.innerText = `${city} - ${state}`;
        nameSearchBar.appendChild(span);
    }
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

function renderPageNotFound(status) {
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