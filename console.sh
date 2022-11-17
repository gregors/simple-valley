node --experimental-vm-modules -i -e "
let sv;
import('./src/index.js').then(module => sv = module)

console.log('example:')
console.log('let val = sv.newValidator({age: 34})')
console.log('sv.validateNumber(val, \'age\', {min: 35})')
"
