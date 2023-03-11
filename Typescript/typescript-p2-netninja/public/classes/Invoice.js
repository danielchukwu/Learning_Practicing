"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.Invoice = void 0;
class Invoice {
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client} owes $${this.amount} for ${this.details}`;
    }
}
exports.Invoice = Invoice;
class Test {
    constructor(t, l) {
        this.title = t;
        this.level = l;
    }
    format() {
        return `Test: ${this.title} for the \nLevel: ${this.level}`;
    }
}
exports.Test = Test;
