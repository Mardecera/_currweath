import {
    countriesDataList,
    citiesDataList,
    divResult,
    inputCity,
    form,
} from '../functions/selectors.js'
import { createElementHTML } from '../functions/functions.js'

export class UI {
    showCountries(countries) {
        countries.forEach((country) => {
            const option = createElementHTML({
                type: 'option',
                value: country.name,
            })
            countriesDataList.appendChild(option)
        })
    }

    showCities(cities) {
        this.cleanCitiesDataList()
        form.querySelector('#input-cities').disabled = false

        cities.forEach((city) => {
            const option = createElementHTML({
                type: 'option',
                value: city.name,
            })
            citiesDataList.appendChild(option)
        })
    }

    showWeather({ main, wind, weather }, city, country) {
        this.cleanShowResult()

        const template = document.querySelector('#template__result').content
        const $template = (query) => template.querySelector(query)
        const src = `https://openweathermap.org/img/w/${weather[0].icon}.png`
        const temp = `${Math.round(main.temp)} ${String.fromCharCode(176)}C`
        const windSpeed = `from ${Math.round(wind.speed * 3.6)}Km/h`

        $template('.temp-city').textContent = `${city}, ${country}`
        $template('.temp-value').textContent = temp
        $template('.temp-picture').src = src
        $template('.weather .title').textContent = `Weather:`
        $template('.humidity .title').textContent = `Humidity:`
        $template('.wind .title').textContent = `Wind:`
        $template('.weather .detail').textContent = `${weather[0].description}`
        $template('.humidity .detail').textContent = `${main.humidity}%`
        $template('.wind .detail').textContent = windSpeed

        const clone = template.cloneNode(true)
        divResult.appendChild(clone)
    }

    showMessageError(messageError = '') {
        this.cleanShowResult()

        const result = createElementHTML({
            type: 'div',
            textContent: messageError,
        })
        divResult.appendChild(result)
    }

    cleanCitiesDataList() {
        while (citiesDataList.firstChild) citiesDataList.lastChild.remove()
        inputCity.value = ''
        // inputCity.disabled = true
    }

    cleanShowResult() {
        while (divResult.firstChild) divResult.lastChild.remove()
    }

    disabledCitys() {
        if (!inputCity.disabled) inputCity.disabled = true
    }

    addLoader(query, message) {
        const template = document.querySelector('#template__loader').content
        template.querySelector('p').textContent = message
        const clone = template.cloneNode(true)

        this.cleanShowResult()
        document.querySelector(query).appendChild(clone)
    }

    quitLoader(query) {
        this.cleanShowResult()
        const textHTML = document.createElement('p')
        textHTML.textContent = 'Find the climate of a city in the world 🧐.'
        divResult.appendChild(textHTML)
    }

    messageResult(message) {
        this.cleanShowResult()
        const textHTML = document.createElement('p')
        textHTML.textContent = message
        divResult.appendChild(textHTML)
    }
}
