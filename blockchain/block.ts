export class Block {

    private id: number
    private transactions: Array<Transaction>
    private timestamp: Date
    private previousHash: string

    constructor(transactions: Array<Transaction>) {
        this.transactions = transactions;
    }
}

export type Transaction = {
    govId: number,
    firstName: string,
    lastName: string,
    ballot: string
}
