const things = [1, 2, 3, 4, 5, "dan"];
const names: string[] =  ["john", "michael", "sophie", "jess"];

// names.push(20)     // Won't work
// things.push(true)  // Won't work

let height: (string | number) = 4.5;

height = "4";

const person: {name: string, age: (number | string)} = {
   name: "daniel",
   age: 23,
   // height: 189   // won't work
}
person.age = "";

let car;

car = "";

car = 5;

console.log(car);