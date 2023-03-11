const addUID = <T extends {name: string}>(obj: T) => {
   const id = Math.floor( Math.random() * 100);
   return obj;
}

const user1 = addUID({name: 'stanley', age: 30});
// const user2 = addUID({age: 5});

console.log(user1);
console.log(user1.name);

// Interface
interface Car<T> {
   name: string;
   model: string;
   year: T;
}

const car1: Car<string> = {
   name: "Mercedes Benz",
   model: "m5",
   year: "2019"
}
const car2: Car<number> = {
   name: "Bmw",
   model: "e11",
   year: 2015
}


console.log(car1);
console.log(car2);
