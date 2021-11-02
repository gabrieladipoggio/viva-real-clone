function renderHTML(state, city, res) {
    let mainDiv = document.getElementById('main-content');
    mainDiv.innerHTML = ''

    if(res.status){
        renderPageNotFound(res.status);
        renderSidebar(state, city);
    } else {
    state = convertState(state);
    city = convertCity(city);
    renderSidebar(state, city)
    renderMainSection(state, city, res);
    renderBreadcrumbs(state, city)

    res.search.result.listings.forEach(listing => {
        let card = createCard(listing);
        mainDiv.appendChild(card)
    })
}
}

