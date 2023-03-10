"use strict";
class Test {
    constructor(t, l) {
        this.title = t;
        this.level = l;
    }
    format() {
        return `Test: ${this.title} for the \nLevel: ${this.level}`;
    }
}
let t1 = new Test("CMP 309", 300);
let t2 = new Test("CMP 325", 300);
console.log(t1, "\n", t2);
