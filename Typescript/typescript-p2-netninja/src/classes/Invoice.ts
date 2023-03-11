export class Invoice {
   constructor(
      readonly client: string,
      private  details: string,
      public   amount: number,
   ){}

   format() {
      return `${this.client} owes $${this.amount} for ${this.details}`;
   }
}

export class Test {
   readonly title: string;
   level: number;

   constructor(t: string, l: number) {
      this.title = t;
      this.level = l;
   }

   private format() {
      return `Test: ${this.title} for the \nLevel: ${this.level}`;
   }

}