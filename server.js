//import { sha256 } from 'js-sha256';
const SHA256 = require('crypto-js/sha256');



class Block{
    constructor(BlockID,timestamp, data, previousHash = ''){
        this.BlockID =BlockID;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.ComputeHash();
    }

    


    ComputeHash(){
    let jsonMap = JSON.stringify([...map.entries()]);
    let block_string = new Map(JSON.parse(jsonMap));
    return SHA256(this.BlockID + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}
class Blockchain{

    constructor(){
    //ar diffculty = 2;
        this.chain = [this.create_genesis_block()];
    }

    create_genesis_block(){
        //var genesis_block = Block(0,[],0,"0",0);
        //genesis_block.8 = ComputeHash(genesis_block);
        //chain.push(genesis_block);
        return new Block(0, "10/17/20", "Genesis block", "0");
    }

    get_last_block(){
        return this.chain[this.chain.length - 1];
    }

    //Add a new block to the chain
    add_block(newBlock){
        newBlock.previousHash = this.get_last_block().hash;
        newBlock.hash = newBlock.ComputeHash();
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


    // function proof_of_work(block){
    //     block.Nonce = 0;

    //     var computed_hash = ComputeHash(block);
    //     while not (computed_hash.startswith('0' * diffculty)){
    //         block.Nonce += 1;
    //         computed_hash = ComputeHash(block);
    //     }

    //     return computed_hash;
    // }

}


//Just for testing purpose
let comcoin = new Blockchain();
comcoin.add_block(new Block(1, "10/17/2020", { amount: 4 }));
comcoin.add_block(new Block(2, "10/17/2020", { amount: 10}));


console.log('Block chain validity' + comcoin.Valid_check())
console.log(JSON.stringify(comcoin, null, 4));



