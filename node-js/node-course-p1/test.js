
setTimeout(() => {
   console.log("HI - setTimeout fired!");
}, 3000);

setInterval(() => {
   console.log("Danzy - setInterval fired!")
}, 1000);

const os = require('os');

console.log(os);