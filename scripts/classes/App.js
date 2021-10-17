import { Manager } from './Manager.js'
import * as DOM from '../functions/selectors.js'

export class App {
    constructor() {
        this.MANAGER = new Manager()
        this.init()
    }

    init() {
        window.onload = async () => {
            this.MANAGER.getCountries()

            DOM.inputCountry.addEventListener('input', (event) => {
                event.preventDefault()
                this.MANAGER.getCities(event.target.value)
            })
            DOM.form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.MANAGER.getWeather(this.getCountryCity())
            })
        }
    }

    getCountryCity() {
        return {
            country: DOM.inputCountry.value,
            city: DOM.inputCity.value,
        }
    }
}
