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
        'GATED_COMMUNITY': 'Condomínio fechado',
        'PLAYGROUND': 'Playground',
        'SAUNA': 'Sauna',
        'PETS_ALLOWED': 'Aceita animais',
        'ELEVATOR': 'Elevador',
        'ELECTRONIC_GATE': 'Portão eletrônico',
        'GARDEN': 'Jardim',
        'PARTY_HALL': 'Salão de festas',
        'FURNISHED': 'Mobiliado',
        'FIREPLACE': 'Lareira',
        'POOL': 'Piscina',
        'BARBECUE_GRILL': 'Churrasqueira',
        'AIR_CONDITIONING': 'Ar condicionado',
        'BICYCLES_PLACE': 'Bicicletário',
        'SPORTS_COURT': 'Quadra esportiva',
        'AMERICAN_KITCHEN': 'Cozinha americana',
        'TENNIS_COURT': 'Quadra de tênis',
        'LAUNDRY': 'Lavanderia',
    }
    return dictionary[amenity]
}
