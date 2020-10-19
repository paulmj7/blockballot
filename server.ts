const express = require("express");
const path = require("path");
const https = require("https");
const bodyParser = require("body-parser");
const { Blockchain, Block } = require('./blockchain');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname + "/frontend", "build")));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const bc = new Blockchain();
let peers: any = new Set();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend", "build", "index.html"));
});

app.post("/new_transaction", (req, res) => {
    let txData = req.body;
    if (!txData.name) res.sendStatus(404);
    if (!txData.ballot) res.sendStatus(404);
    if (!txData.gov_id) res.sendStatus(404);

    txData.timestamp = new Date(Date.now());;
    bc.add_block(txData);
    res.sendStatus(200);
});

app.get("/chain", (req, res) => {
    const chainData = bc.chain.slice();
    console.log(JSON.stringify(chainData));
    res.json(chainData);
});

app.get("/mine", (req, res) => {
    const result = bc.mine();
    if (!result) res.send(400);
    else {
        const chainLength = bc.chain.length;
        consensus();
        if (chainLength === bc.chain.length) announceNewBlock(bc.get_last_block());
        res.send(200);
    }
});

app.get("/pending_tx", (req, res) => {
    res.send(bc.unconfirmedTransactions);
});

app.post("/register_node", (req, res) => {
    const nodeAddress = req.body.node_address;
    if (!nodeAddress) res.send(400);
    peers.add(nodeAddress);
    res.send(JSON.stringify(bc.chain));
});

app.post("/register_with", (req, res) => {
    const nodeAddress = req.body.node_address;
    if (!nodeAddress) res.send(400);
    const data = { "node_address": req.url };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    let  registerError = false;
    const request = https.request(options, response => {
        response.on("error", error => {
            console.error(error);
        });
        if (response.statusCode === 200) {
            const chainDump = response.body.chain;
            const blockchain = createChainFromDump(chainDump);
            let merged = new Set(...peers, ...new Set(response.body.peers));
            peers = merged;
        } else registerError = true;
    });
    request.end();
    if (registerError) res.send(400);
    else res.send(200);
});

app.post("/add_block", (req, res) => {
    const blockData = req.body;
    const newBlock = new Block(blockData.index, blockData.transactions, blockData.timestamp, blockData.prevHash);
    const proof = blockData.hash;
    const added = bc.addBlock(newBlock, proof);
    if (!added) res.send(400);
    res.send(201);
});

const announceNewBlock = (block) => {
    for (let i: number = 0; i < peers.keys().length; i++) {
        const url = peers.keys()[i] + "/add_block";
        const options = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(block)
        }
        const request = https.request(options, (response) => {
            console.log(response.statusCode);
        });
        request.end();
    }
}

const createChainFromDump = (chainDump) => {
    const generatedBlockchain = new Blockchain();
    for (let i: number = 0; i < chainDump.length; i++) {
        const newBlock = new Block(chainDump[i].block_data.index, chainDump[i].block_data.transactions, chainDump[i].block_data.timestamp);
        const proof = chainDump[i].block_data.hash;
        if (chainDump[i].idx > 0) {
            const added = generatedBlockchain.addBlock(newBlock, proof);
            if (!added) throw new Error("Tampered with");
        } else {
            generatedBlockchain.chain.push(newBlock);
        }
    }
}

const consensus = () => {
    let longestChain = null;
    let currLen = bc.chain.chain.length;
    for (let i: number = 0; i < peers.keys().length; i++) {
        const options = {
            hostname: peers.keys()[i],
            path: "/chain",
            method: "GET"
        };
        const request = https.request(options, response => {
            console.log(response.statusCode);
            const length = response.body.length;
            const chain = response.body.chain;
            if (length > currLen && bc.checkChainValidity(chain)) {
                currLen = length;
                longestChain = chain;
            }
        });
        request.end();
    }
    if (longestChain) {
        bc.chain = longestChain;
        return true;
    }
    return false;
}

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});