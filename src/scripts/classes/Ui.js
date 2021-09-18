import { countriesDataList, citiesDataList, divResult, inputCity } from "../functions/selectors.js"
import { createElementHTML } from "../functions/functions.js"

export class UI {
    showCountries(countries) {
        countries.forEach(country => {
            const option = createElementHTML({
                type: 'option', value: country.name
            })
            countriesDataList.appendChild(option)
        })
    }

    showCities(cities) {
        this.cleanCitiesDataList()
        
        cities.forEach(city => {
            const option = createElementHTML({
                type: 'option', value: city.name
            })
            citiesDataList.appendChild(option)
        })
    }

    showWeather({ main = {}, wind = {}, weather = [] }, city, country) {
        this.cleanShowResult()

        const weatherTEMP = this.getWeatherTemp(main, weather[0], country, city)
        const weatherBODY = this.getWeatherBody(main, wind, weather[0])

        divResult.appendChild(weatherTEMP)
        divResult.appendChild(weatherBODY)
    }

    showMessageError(messageError = '') {
        this.cleanShowResult()

        const result = createElementHTML({ type: 'div', textContent: messageError })
        divResult.appendChild(result)
    }

    getWeatherTemp({temp}, weather, country, city) {
        const tempHTML = createElementHTML({ classes: ['temp-result'] })
        const tempCity = createElementHTML({
            classes: ['temp-city'],
            textContent: `${city}, ${country}`
        })
        const tempContainer = createElementHTML({classes: ['temp-container']})
        const tempValue = createElementHTML({
            textContent: `${Math.round(temp)} ${String.fromCharCode(176)}C`,
            classes: ['temp-value']
        })
        const tempPicture = createElementHTML({
            type: 'img',
            src: `https://openweathermap.org/img/w/${weather.icon}.png`,
            classes: ['temp-picture']
        })

        tempContainer.appendChild(tempValue)
        tempContainer.appendChild(tempPicture)
        tempHTML.appendChild(tempCity)
        tempHTML.appendChild(tempContainer)

        return tempHTML
    }
    
    getWeatherBody({ humidity }, { speed }, weather) {
        const detailsWeatherHTML = createElementHTML({ classes: ['details-result'] })
        const fieldDetailSky = createElementHTML({classes: ['field']})
        const fieldDetailHumidity = createElementHTML({classes: ['field']})
        const fieldDetailWind = createElementHTML({ classes: ['field'] })
        const spanSkyTitle = createElementHTML({
            type: 'span',
            textContent: `Weather:`,
            classes: ['title']
        })
        const spanSkyDetail = createElementHTML({
            type: 'span',
            textContent: `${weather.description}`,
            classes: ['detail']
        })
        const spanHumidityTitle = createElementHTML({
            type: 'span',
            textContent: `Humidity:`,
            classes: ['title']
        })
        const spanHumidityDetail = createElementHTML({
            type: 'span',
            textContent: `${humidity}%`,
            classes: ['detail']
        })
        const spanWindTitle = createElementHTML({
            type: 'span',
            textContent: `Wind:`,
            classes: ['title']
        })
        const spanWindDetail = createElementHTML({
            type: 'span',
            textContent: `from ${Math.round(speed * 3.6)}Km/H`,
            classes: ['detail']
        })

        fieldDetailWind.appendChild(spanWindTitle)
        fieldDetailWind.appendChild(spanWindDetail)
        fieldDetailHumidity.appendChild(spanHumidityTitle)
        fieldDetailHumidity.appendChild(spanHumidityDetail)
        fieldDetailSky.appendChild(spanSkyTitle)
        fieldDetailSky.appendChild(spanSkyDetail)
        
        detailsWeatherHTML.appendChild(fieldDetailSky)
        detailsWeatherHTML.appendChild(fieldDetailHumidity)
        detailsWeatherHTML.appendChild(fieldDetailWind)

        return detailsWeatherHTML
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