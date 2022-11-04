function solve() {

    let mainURI = `http://localhost:3030/jsonstore/bus/schedule/`;
    let prefix = 'depot';

    let span = document.getElementsByClassName('info')[0];

    let departButton = document.getElementById('depart')
    let arriveButton = document.getElementById('arrive')

    let metaStop = ''
    


    async function depart() {

        let main = mainURI + prefix
        let response = await fetch(main);
        console.log(response)

        let currentStop = await(response.json())

        console.log(currentStop)
        let currentName = currentStop.name;
        let nextStop = currentStop.next;

        console.log(`${currentName} ${nextStop}`);
        span.textContent = `Next stop ${currentName}`;
        prefix = nextStop;
        metaStop = currentName;
        
        departButton.disabled = true;
        arriveButton.disabled = false;


    }

    function arrive() {
        
        span.textContent = `Arriving at ${metaStop}`;


        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

