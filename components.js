
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
    nameSearchBar.innerHTML = ''
    
    if(state && city) {
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
