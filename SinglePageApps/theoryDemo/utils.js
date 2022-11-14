

export function sum(a,b) {
    verifyNumber(a)
    verifyNumber(b)
    return a + b;
}

export function product (a,b) {
    verifyNumber(a)
    verifyNumber(b)
    return a * b;
}


function verifyNumber(arg) {
    if (typeof arg != 'number') {
        throw new TypeError('Argument provided must be a number!!!')
    }
}

const data = [10, 29, 30];

function printData () {
    console.log(data);
}

export {
    data,
    printData
}

