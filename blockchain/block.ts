import { createHash } from "https://deno.land/std@0.74.0/hash/mod.ts";

export class Block {
  private id: number;
  private transactions: Array<Transaction>;
  private timestamp: Date;
  private previousHash: string;

  constructor(
    id: number,
    transactions: Array<Transaction>,
    timestamp: Date,
    previousHash: string,
  ) {
    this.id = id;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
  }

  computeHash(): string {
    return createHash("sha256").update(this).toString();
  }
}

export type Transaction = {
  govId: number;
  firstName: string;
  lastName: string;
  ballot: string;
};
