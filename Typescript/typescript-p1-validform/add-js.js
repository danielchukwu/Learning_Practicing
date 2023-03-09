var num1 = document.querySelector('input[name="num1"]');
var num2 = document.querySelector('input[name="num2"]');
var button = document.querySelector("button");
console.log(num1);
console.log(num2);
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener('click', function () {
    var result = add(+num1.value, +num2.value);
    console.log(result);
});
console.log("It works!");
