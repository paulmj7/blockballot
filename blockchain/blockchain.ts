import { Block, Transaction } from "./Block.ts";

export class Blockchain {
  private chain: Array<Block>;
  private unconfirmedTransactions: Array<Transaction>;
  private difficulty: number;
  constructor() {
    this.chain = [];
    this.unconfirmedTransactions = [];
    this.difficulty = 2;
    this.init();
  }

  private init(): void {
    this.chain.push(new Block(0, [], new Date(Date.now()), "0"));
  }

  private peek(): Block {
    return this.chain[this.chain.length - 1];
  }

  private pushNewBlock(block: Block): void {
    this.chain.push(block);
  }

  pushNewTransaction(transaction: Transaction): void {
    this.unconfirmedTransactions.push(transaction);
  }
}
