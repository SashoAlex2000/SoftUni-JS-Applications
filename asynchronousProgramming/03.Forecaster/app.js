function attachEvents() {

    // adding the event listner to the button
    let button = document.getElementById('submit');
    button.addEventListener('click', getWeather);

    // main url keeping the keys
    let mainURI = `http://localhost:3030/jsonstore/forecaster/locations`;

    // the main path for getting the different cities with their respective code.
    let getterURIMain = `http://localhost:3030/jsonstore/forecaster`

    //the function where the main logic is kept
    async function getWeather(event) {

        let mainDiv = document.getElementById('forecast');
        mainDiv.innerHTML = `
            <div id="current">
                <div class="label">Current conditions</div>
            </div>
            <div id="upcoming">
                <div class="label">Three-day forecast</div>
            </div>
            `



        // getting the city from the user input and gettin the needed data through the main path
        let city = document.getElementById('location').value;
        let response = await fetch(mainURI);
        let data = await (response.json());
        let code;

        // getting the city code if we have such a city in the base
        for (let element of data) {

            if (element.name == city) {
                code = element.code;
            }
        }

        console.log(code);

        try {
            //Today's weather
            // getting the needed stuff from the server
            let currentWeatherURI = getterURIMain + `/today/${code}`
            let currentResponse = await fetch(currentWeatherURI);
            let currentDayData = await (currentResponse.json());
            console.log(currentDayData.forecast)

            // generating and getting through DOM the needed elements and 
            mainDiv.style.display = 'block';
            let firstDiv = document.getElementById('current');
            let divCurrentDay = document.createElement('div');
            divCurrentDay.classList.add('forecasts');

            // getting the adequate forecast symbol
            let firstSymbol;
            switch (currentDayData.forecast.condition) {
                case 'Sunny': firstSymbol = '&#x2600'; break;
                case 'Partly sunny': firstSymbol = '&#x26C5'; break;
                case 'Overcast': firstSymbol = '&#x2601'; break;
                case 'Rain': firstSymbol = '&#x2614'; break;
            }

            // adding the needed elements in the DOM
            let firstHTML = `
            <span class="condition symbol">${firstSymbol}</span>
            <span class="condition">
            <span class="forecast-data">${currentDayData.name}</span>
            <span class="forecast-data">${currentDayData.forecast.low}&#176/${currentDayData.forecast.high}&#176</span>
            <span class="forecast-data">${currentDayData.forecast.condition}</span>
            </span>
            `
            divCurrentDay.innerHTML = firstHTML;
            firstDiv.appendChild(divCurrentDay);

            // NEXT 3 days weather
            // getting the needed from the server and the the html
            let nextDaysURI = getterURIMain + `/upcoming/${code}`;
            let nextDaysResponse = await fetch(nextDaysURI);
            let nextDaysData = await (nextDaysResponse.json());
            let upcomingDIV = document.getElementById('upcoming');

            // adding a new span to the DOM
            for (let element of nextDaysData.forecast) {

                let elementSPAN = document.createElement('span');
                elementSPAN.classList.add('upcoming')

                let firstSymbol;
                switch (element.condition) {
                    case 'Sunny': firstSymbol = '&#x2600'; break;
                    case 'Partly sunny': firstSymbol = '&#x26C5'; break;
                    case 'Overcast': firstSymbol = '&#x2601'; break;
                    case 'Rain': firstSymbol = '&#x2614'; break;
                }


                let upcomingHTML = `
                <span class="symbol">${firstSymbol}</span>
                <span class="forecast-data">${element.low}&#176/${element.high}&#176</span>
                <span class="forecast-data">${element.condition}</span>
                `;

                elementSPAN.innerHTML = upcomingHTML;

                upcomingDIV.appendChild(elementSPAN);

            }


        } catch (err) {
            mainDiv.innerHTML = `
            Error
            `
        }

    }
}

attachEvents();