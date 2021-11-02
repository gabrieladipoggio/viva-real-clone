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
