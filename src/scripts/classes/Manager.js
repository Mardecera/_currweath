import { UI } from './Ui.js'

const URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json'
const MESSAGE_WEATHER_NOT_FOUND = `El pais o ciudad ingresados no existen o no tienen relación entre si. :(`
const MESSAGE_GET_NOT_COUNTRIES = 'No se pudieron cargar los paises! :('

// I need id, name, iso2, cities[]

export class Manager{
    constructor() {
        this.countries = []
        this.ui = new UI()
    }

    async init() { await this.getCountries() }

    showCountries() { this.ui.showCountriesName(this.countries) }

    showCitys(event = {}) {
        event.preventDefault()
        const selectedCountryName = event.target.value

        if (this.countryExist(selectedCountryName)) {
            const citiesOfCountry = this.selectedCountry(selectedCountryName).cities
            this.ui.showCitiesName(citiesOfCountry)
        }
    }

    async getCountries() {
        try {
            const request = await fetch(URL)
            const data = await request.json()
            
            data.forEach(fact => {
                if (fact.cities.length != 0) {
                    const country = {
                        name: fact.name,
                        iso2: fact.iso2,
                        cities: fact.cities
                    }
                    this.countries = [...this.countries, country]
                }
            })
        } catch (error) {
            this.ui.showMessageError(MESSAGE_GET_NOT_COUNTRIES)
            return
        }
    }

    async query(event = {}, selectedCountryName = '', selectedCityName = '') {
        event.preventDefault()

        const key = '7c799227f894fbfb20a2a08b6372090f'
        const isoOfCountry = this.getIsoOfCountry(selectedCountryName)
        const url = this.getQueryUrl(selectedCityName, isoOfCountry, key)

        try {
            const request = await fetch(url)
            const data = await request.json()
            this.ui.showWeather(data)
        } catch (error) {
            this.ui.showMessageError(MESSAGE_WEATHER_NOT_FOUND)
            return
        }
    }

    countryExist(countryName = '') {
        return this.countries.some(country => country.name === countryName)
    }
    selectedCountry(countryName = '') {
        return this.countries.find(country => country.name === countryName )
    }
    getIsoOfCountry(countryName = '') {
        return this.countryExist(countryName)? this.selectedCountry(countryName).iso2 : undefined
    }
    getQueryUrl(cityName = '', isoOfCountry = '', key = '') {
        return `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${isoOfCountry}&units=metric&appid=${key}`
    }
}