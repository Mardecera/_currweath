import { UI } from './Ui.js'

const URL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json'

// I need id, name, iso2, iso3, cities[]

export class Manager{
    constructor() {
        this.countries = []
        this.countryIsoSelected
        this.ui = new UI()
    }

    async init() {
        await this.getCountries()
    }

    showCountries() {
        this.ui.showCountriesName(this.countries)
    }

    showCitys(event) {
        event.preventDefault()

        const countrySelectedName = event.target.value
        const countryExist = this.countries.some(country => country.name == countrySelectedName)
        if (countryExist) {
            const countryCities = this.countries.find(country => {
                return country.name == countrySelectedName
            })
            this.countryIsoSelected = countryCities.iso2
            this.ui.showCitiesName(countryCities.cities)
        }
    }

    async getCountries() {
        try {
            const request = await fetch(URL)
            const data = await request.json()
            
            data.forEach(fact => {
                if (fact.cities.length != 0) {
                    const country = {
                        id: fact.id,
                        name: fact.name,
                        iso2: fact.iso2,
                        iso3: fact.iso3,
                        cities: fact.cities
                    }
                    this.countries = [...this.countries, country]
                }
            })
        } catch (error) {
            console.log('No se obtuvo los paises...')
            return
        }
    }

    async consult(event, citySelected) {
        event.preventDefault()

        const key = '7c799227f894fbfb20a2a08b6372090f'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected},${this.countryIsoSelected}&units=metric&appid=${key}`

        try {
            const request = await fetch(url)
            const data = await request.json()
            this.ui.showWeather(data)
        } catch (error) {
            const messageError = `${this.countryIsoSelected} o ${citySelected} no encontradas o relacionadas.`
            this.ui.showWeatherNotFound(messageError)
            console.log(error)
            return
        }     
    }
}