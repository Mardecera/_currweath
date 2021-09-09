import { Manager } from "./Manager.js"
import { inputCountry, inputCity, buttonGo } from "../functions/selectors.js"

export class App{
    constructor() {
        this.manager = new Manager()
        this.init()
    }

    init() {
        document.addEventListener('DOMContentLoaded', async () => {
            await this.manager.init()
            this.manager.showCountries()

            inputCountry.addEventListener('input', (event) => {
                this.manager.showCitys(event)
            })
            buttonGo.addEventListener('click', (event) => {
                this.manager.query(event, inputCountry.value, inputCity.value)
            })
        })
    }
}
