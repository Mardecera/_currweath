const $ = (element) => document.querySelector(element)

const countriesDataList = $('#countries')
const citiesDataList = $('#cities')
const inputCountry = $('#input-countries')
const inputCity = $('#input-cities')
const buttonGo = $('#btn-go')
const divResult = $('#form-result')
const form = $('#form')

export {
    countriesDataList,
    inputCountry,
    inputCity,
    citiesDataList,
    buttonGo,
    divResult,
    form
}