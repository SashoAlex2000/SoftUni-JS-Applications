

function pancaker(arr) {

    let biggestSum = 0;
    let startingMagicIndex = -1;
    let endMagicIndex = -1;

    for (let length = 1; length <= arr.length; length++) {
        // console.log(`Current length: ${length}`)
        for (let start_pos = 0; start_pos <= arr.length - length; start_pos++) {
            
            // console.log(`Current start pos: ${start_pos}`);
            let currentSum = 0;
            for (let i = start_pos; i < start_pos+length; i++) {
                currentSum += arr[i];
            }
            // console.log(currentSum);

            if (currentSum > biggestSum) {
                startingMagicIndex = start_pos;
                endMagicIndex = start_pos + length - 1;
                biggestSum = currentSum;
            }
            if (currentSum == biggestSum && length > endMagicIndex - startingMagicIndex + 1) {
                startingMagicIndex = start_pos;
                endMagicIndex = start_pos + length - 1;
                biggestSum = currentSum;
            }

        }

        // console.log("\n");

    }

    console.log(`${biggestSum} ${startingMagicIndex} ${endMagicIndex}`);

}


// const userInput = prompt();
// console.log(userInput);

pancaker([4, -7, 2, 5, -9, 3, 1, 2]);
pancaker([4, -4, 2, 5, -9, 3, 1, 1, 1, 1, -4]);
pancaker([-3, 2, 2, -2, 1, -4, 0, 4, -10, 1, 3]);
