import { UI } from './Ui.js'

const MESSAGE_WEATHER_NOT_FOUND = `Couldn't get the weather for this city! 😔`
const MESSAGE_GET_NOT_COUNTRIES = 'Countries could not be loaded! 😔'
const MESSAGE_GET_NOT_CITIES = 'Cities could not be loaded! 😔'

export class Manager {
    constructor() {
        this.key = 'eVFEd01XT0JjM0duMlh0bkdHQmx6aTE0R2NPT1Awa1dBNmo5Tm13WA=='
        this.countries = JSON.parse(localStorage.getItem('currweath')) || []
        this.UI = new UI()
    }

    async getCountries() {
        try {
            if (this.countries.length === 0) {
                const request = await fetch(
                    this.getURLCountries(),
                    this.getRequestOptions()
                )
                const countries = await request.json()

                localStorage.setItem('currweath', JSON.stringify(countries))
                this.countries = countries
            }
            this.UI.showCountries(this.countries)
        } catch (error) {
            this.UI.showMessageError(MESSAGE_GET_NOT_COUNTRIES)
            console.error(error)
            return
        }
    }

    async getCities(country) {
        this.UI.cleanCitiesDataList()

        if (this.countryExist(country)) {
            const iso2 = this.getIso(country)
            try {
                this.UI.addLoader(
                    '#form-result',
                    'Looking for city of this city 🌇...'
                )
                const request = await fetch(
                    this.getURLCitys(iso2),
                    this.getRequestOptions()
                )
                this.UI.messageResult('Select a city in this country 😎.')
                const cities = await request.json()
                if (cities.length !== 0) {
                    this.UI.showCities(cities)
                } else {
                    this.UI.messageResult(
                        'The cities of this country cannot be loaded 😟, try searching for another country 😉.'
                    )
                }
            } catch (error) {
                this.UI.showMessageError(MESSAGE_GET_NOT_CITIES)
            }
        } else {
            this.UI.disabledCitys()
            this.UI.messageResult(
                `We can't find this country 😩, try another 😌.`
            )
        }
    }

    async getWeather({ country, city }) {
        const key = '7c799227f894fbfb20a2a08b6372090f'

        try {
            const iso = this.getIso(country)
            const url = this.getURLWeather(city, iso, key)
            this.UI.addLoader(
                '#form-result',
                'Looking for climate of this city ⛅...'
            )
            const request = await fetch(url)
            const weather = await request.json()

            this.UI.quitLoader('#form-result')
            this.UI.showWeather(weather, city, country)
        } catch (error) {
            this.UI.messageResult(
                `We can't find this country 😩, try another 😌.`
            )
            console.error(error)
            return
        }
    }

    countryExist(countryName) {
        return this.countries.some((country) => country.name === countryName)
    }

    getIso(countryName) {
        return this.countries.find((country) => country.name === countryName)
            .iso2
    }

    getRequestOptions() {
        var headers = new Headers()
        headers.append('X-CSCAPI-KEY', this.key)
        return {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        }
    }

    getURLCitys(iso2) {
        return `https://api.countrystatecity.in/v1/countries/${iso2}/cities`
    }

    getURLCountries() {
        return 'https://api.countrystatecity.in/v1/countries'
    }

    getURLWeather(city, iso, key) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city},${iso}&units=metric&appid=${key}`
    }
}
