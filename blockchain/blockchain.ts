import { Block, Transaction } from "./Block";

export class Blockchain {
  private chain: Array<Block>;
  private unconfirmedTransactions: Array<Transaction>;
  constructor() {
    this.chain = [];
    this.unconfirmedTransactions = [];
  }
}
