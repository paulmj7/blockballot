const hash = require('crypto');


export class Block {
    id: number
    timestamp: string
    xActions: Map<string, string>
    prevHash: string
    hash: string
    nonce: number

    constructor(id: number, timestamp: string, xActions: Map<string, string>){
        this.id = id;
        this.timestamp = timestamp; 
        this.xActions = xActions; 
        this.hash = this.computeHash();
    }

    computeHash() {
        return hash.createHash('sha256').update(JSON.stringify(this)).digest('hex');
    }

    mineBlock(difficulty: number) {
        this.nonce = 0;
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.computeHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }
}



export class Blockchain {

    chain: Array<Block>
    difficulty: number

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, new Date(Date.now()).toISOString(), new Map([
            ["ballot", "none"],
            ["gov_id", "none"],
            ["name", "none"]
        ]));
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block: Block) {
        block.prevHash = this.getLastBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
    }

    validCheck() {
        for (let i = 1; i < this.chain.length; i++) {
            const curr: Block = this.chain[i];
            const prev: Block = this.chain[i-1];

            if (curr.hash !== curr.computeHash()) {
                console.log("curr hash not equal to curr computeHash");
                return false;
            }
            if(curr.prevHash !== prev.hash) {
                console.log("curr prevHash not equal to prev hash");
                return false;
            }
        }
        return true;
    }
}
/*
let bc = new Blockchain();


let block1 = new Block(1, new Date(Date.now()).toISOString(), new Map([
    ["ballot", "Joe Biden"],
    ["name", "John Smith"],
    ["gov_id", "1234"]
]));
let block2 = new Block(2, new Date(Date.now()).toISOString(), new Map([
    ["ballot", "Joe Biden"],
    ["name", "Steve Wang"],
    ["gov_id", "2345"]
]));
bc.addBlock(block1);
bc.addBlock(block2);
console.log(`Checking validity: ${bc.validCheck()}`);
bc.chain[1].timestamp = new Date(Date.now()).toISOString();
console.log(`Checking validity after change: ${bc.validCheck()}`);
*/