const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');


class Block{
    constructor(BlockID,timestamp, data, previousHash = ''){
        this.BlockID =BlockID; //Index number
        this.timestamp = timestamp; 
        this.data = data; //jason data input
        this.previousHash = previousHash; 
        this.hash = this.ComputeHash(); //current calculated hash
        this.nonce = 0;
    }

    
//Calculate hash number from crypto
    ComputeHash(){

    //return SHA256(this.BlockID + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();
    return crypto.createHash('sha256').update(this.BlockID + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).digest('hex');
    }

//Hash complexity settings
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.ComputeHash();
        }
        console.log("Block mined:  " + this.hash);

        //return this.hash;
    }

}



class Blockchain{

    constructor(){

        this.chain = [this.create_genesis_block()];
        this.difficulty = 2;
    }

    create_genesis_block(){

        return new Block(0, Date(Date.now()), "Genesis block", "0");
    }
    //latest block of the chain
    get_last_block(){
        return this.chain[this.chain.length - 1];
    }

    //Add a new block to the chain
    add_block(newBlock){
        newBlock.previousHash = this.get_last_block().hash;
        //newBlock.hash = newBlock.ComputeHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    //Checks for validity of the hashes
    Valid_check(){
        for(let i =1; i < this.chain.length; i++){
            const current = this.chain[i];
            const previous = this.chain[i-1];

            if(current.hash !== current.ComputeHash()){
                return false;
            }
            if(current.previousHash !== previous.hash){
                return false;
            }


        }
        return true;
    }


}


//Dummy data
let comcoin = new Blockchain();

console.log('Mining block 1 ...')
comcoin.add_block(new Block(1, Date(Date.now()), { amount: 4 }));

console.log('Mining block 2 ...')
comcoin.add_block(new Block(2, Date(Date.now()), { amount: 10}));


console.log('Block chain validity: ' + comcoin.Valid_check())
console.log(JSON.stringify(comcoin, null, 4));


//Test for force changing data after block chain generation
//comcoin.chain[1]. data = { amount: 100};
//console.log('Block chain validity' + comcoin.Valid_check())



module.exports.Blockchain = Blockchain;
module.exports.Block = Block;