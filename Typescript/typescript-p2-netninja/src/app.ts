class Test {
   private title: string;
   level: number;

   constructor(t: string, l: number) {
      this.title = t;
      this.level = l;
   }

   private format() {
      return `Test: ${this.title} for the \nLevel: ${this.level}`;
   }
   
}

let t1: Test = new Test("CMP 309", 300);
let t2: Test = new Test("CMP 325", 300);

console.log(t1, "\n", t2);