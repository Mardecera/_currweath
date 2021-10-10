import { UI } from './Ui.js'

const MESSAGE_WEATHER_NOT_FOUND = `Couldn't get the weather for this city! 😔`
const MESSAGE_GET_NOT_COUNTRIES = 'Countries could not be loaded! 😔'
const MESSAGE_GET_NOT_CITIES = 'Cities could not be loaded! 😔'

export class Manager{
    constructor() {
        this.key = 'eVFEd01XT0JjM0duMlh0bkdHQmx6aTE0R2NPT1Awa1dBNmo5Tm13WA=='
        this.countries = []
        this.UI = new UI()
    }

    async getCountries() {
        try {
            const request = await fetch(this.getURLCountries(), this.getRequestOptions())
            const countries = await request.json()

            this.countries = countries
            this.UI.showCountries(this.countries)
        } catch (error) {
            this.UI.showMessageError(MESSAGE_GET_NOT_COUNTRIES)
            return
        }
    }

    async getCities(country) {
        this.UI.cleanCitiesDataList()
        if (this.countryExist(country)) {
            const iso2 = this.getIso(country)
            try {
                const request = await fetch(this.getURLCitys(iso2), this.getRequestOptions())
                const cities = await request.json()

                this.UI.showCities(cities)
            } catch (error) {
                this.UI.showMessageError(MESSAGE_GET_NOT_CITIES)
            }
        }
    }

    async getWeather({country, city}) {
        const key = '7c799227f894fbfb20a2a08b6372090f'
        const iso = this.getIso(country)
        const url = this.getURLWeather(city, iso, key)

        try {
            const request = await fetch(url)
            const weather = await request.json()
            this.UI.showWeather(weather, city, country)
        } catch (error) {
            this.UI.showMessageError(MESSAGE_WEATHER_NOT_FOUND)
            return
        }
    }

    countryExist(countryName) {
        return this.countries.some(country => country.name === countryName)
    }

    getIso(countryName) {
        return this.countries.find(country => country.name === countryName).iso2
    }

    getRequestOptions() {
        var headers = new Headers()
        headers.append("X-CSCAPI-KEY", this.key)
        return {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }
    }

    getURLCitys(iso2) {
        return `https://api.countrystatecity.in/v1/countries/${iso2}/cities`
    }

    getURLCountries() {
        return "https://api.countrystatecity.in/v1/countries"
    }

    getURLWeather(city, iso, key) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city},${iso}&units=metric&appid=${key}`
    }
}