import { countriesDataList, citiesDataList, divResult, inputCity } from "../functions/selectors.js"
import { createElementHTML } from "../functions/functions.js"

export class UI {
    showCountriesName(countries = []) {
        countries.forEach(country => {
            const option = createElementHTML({
                type: 'option', value: country.name
            })
            countriesDataList.appendChild(option)
        })
    }

    showCitiesName(cities = []) {
        this.cleanCitiesDataList()
        cities.forEach(city => {
            const option = createElementHTML({
                type: 'option', value: city.name
            })
            citiesDataList.appendChild(option)
        })
    }

    showWeather({ main = {}, name = '', wind = {}, weather = [] }) {
        this.cleanShowResult()

        const tempResult = createElementHTML({
            type: 'div',
            textContent: `${Math.round(main.temp)} ${String.fromCharCode(8451)}`,
            classes: ['temp-result']
        })
        const imgWeather = createElementHTML({
            type: 'img',
            src: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
            classes: ['img-result']
        })
        const additResult = createElementHTML({ classes: ['addit-result'] })
        const spanWeather = createElementHTML({
            type: 'span',
            textContent: `Weather: ${weather[0].description}`,
            classes: ['weather-result']
        })
        const spanHumidity = createElementHTML({
            type: 'span',
            textContent: `Humidity: ${main.humidity}%`,
            classes: ['humidity-result']
        })
        const spanWind = createElementHTML({
            type: 'span',
            textContent: `Wind: from ${Math.round(wind.speed * 3.6)}Km/H`,
            classes: ['wind-result']
        })
        const spanName = createElementHTML({
            type: 'span',
            textContent: name,
            classes: ['name-result']
        })

        tempResult.appendChild(imgWeather)
        additResult.appendChild(spanName)
        additResult.appendChild(spanWeather)
        additResult.appendChild(spanHumidity)
        additResult.appendChild(spanWind)
        divResult.appendChild(tempResult)
        divResult.appendChild(additResult)
    }

    showMessageError(messageError = '') {
        this.cleanShowResult()

        const result = createElementHTML({ type: 'div', textContent: messageError })
        divResult.appendChild(result)
    }

    cleanCitiesDataList() {
        while (citiesDataList.firstChild) {
            citiesDataList.lastChild.remove()
        }
        inputCity.value = ''
    }

    cleanShowResult() {
        while (divResult.firstChild) {
            divResult.lastChild.remove()
        }
    }
}