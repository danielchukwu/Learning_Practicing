const num1 = document.querySelector('input[name="num1"]')! as HTMLInputElement;
const num2 = document.querySelector('input[name="num2"]')! as HTMLInputElement;
const button = document.querySelector("button")! as HTMLButtonElement;
console.log(num1);
console.log(num2);

function add(num1: number, num2: number) {
   return num1 + num2;
}

button.addEventListener('click', function() {
   let result = add(+num1.value, +num2.value); 
   console.log(result);
})

console.log("It works!");