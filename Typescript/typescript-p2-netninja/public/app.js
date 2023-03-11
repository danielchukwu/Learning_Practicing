"use strict";
const addUID = (obj) => {
    const id = Math.floor(Math.random() * 100);
    return obj;
};
const user1 = addUID({ name: "stanley", age: 30 });
// const user2 = addUID({age: 5});
console.log(user1);
console.log(user1.name);
const car1 = {
    name: "Mercedes Benz",
    model: "m5",
    year: "2019",
};
const car2 = {
    name: "Bmw",
    model: "e11",
    year: 2015,
};
console.log(car1);
console.log(car2);
// Enums
var StateType;
(function (StateType) {
    StateType[StateType["ABUJA"] = 0] = "ABUJA";
    StateType[StateType["ANAMBARA"] = 1] = "ANAMBARA";
    StateType[StateType["ABIA"] = 2] = "ABIA";
    StateType[StateType["ENUGU"] = 3] = "ENUGU";
    StateType[StateType["KADUNA"] = 4] = "KADUNA";
    StateType[StateType["JOS"] = 5] = "JOS";
    StateType[StateType["LAGOS"] = 6] = "LAGOS";
})(StateType || (StateType = {}));
console.log(StateType);
console.log(StateType.ABIA);
console.log(StateType.ENUGU);
console.log(StateType.LAGOS);
// Tuples
let tup = ["dan", 23, true];
tup = ["eto", 23, true];
tup[1] = 25;
