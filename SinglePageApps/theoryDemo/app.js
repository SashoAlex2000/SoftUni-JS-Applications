

import {product, sum, data, printData} from './utils.js';
import registerPerson from './module.js'

console.log(sum(5,3));
console.log(product(5,3));
// console.log(sum(['5'],3));

console.log('DATA: ')
console.log(data);

data.push('x');

printData();

console.log(registerPerson('alexxx', 2000))
