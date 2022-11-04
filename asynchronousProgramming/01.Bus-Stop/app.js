async function getInfo() {
    console.log("TODO...");
    let unorderedList = document.getElementById('buses');
    unorderedList.textContent = ''
    let titleDiv = document.getElementById('stopName');
    titleDiv.textContent = ''

    const stopInfoElement = document.getElementById('stopId');


    const stopId = stopInfoElement.value;
    console.log(stopId);


    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;


    try {
        const response = await fetch(url);
        console.log(response.statusText)
    
        // if (response.statusText == 'No Content') {
        //     titleDiv.textContent = 'Error';
        //     return;
        // }
    
        const data = await response.json();
        console.log(data.buses)
    
    
        titleDiv.textContent = data.name;
    
    
        for (let key in data.buses) {
            console.log(`${key} - ${data.buses[key]}`)
    
            let newListItem = document.createElement('li');
            newListItem.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`;
            unorderedList.appendChild(newListItem);
    
        }
    }catch (err) {
        console.log('hmhmhmhm');
        titleDiv.textContent = 'Error'
    }

    




}