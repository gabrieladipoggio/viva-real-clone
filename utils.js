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
