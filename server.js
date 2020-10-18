const express = require("express");
const path = require("path");
const https = require("https");
const bodyParser = require("body-parser");
const {Blockchain, Block} = require('./blockchain');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname + "/frontend", "build")));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const bc = new Blockchain();
let peers = new Set();

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
    chainData = bc.chain.slice();
    console.log(JSON.stringify(chainData));
    res.json(chainData);
});

app.get("/mine", (req, res) => {
    result = bc.mine();
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
    nodeAddress = req.body.node_address;
    if (!nodeAddress) res.send(400);
    peers.add(nodeAddress);
    res.send(JSON.stringify(bc.chain));
});

app.post("/register_with", (req, res) => {
    nodeAddress = req.body.node_address;
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
            chainDump = response.body.chain;
            blockchain = createChainFromDump(chainDump);
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
    for (peer in peers) {
        const url = "peer" + "/add_block";
        const options = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(block)
        }
        const request = http.request(options, (response) => {
            console.log(response.statusCode);
        });
        request.end();
    }
}

const createChainFromDump = (chainDump) => {
    const generatedBlockchain = new Blockchain();
    for (item in chainDump) {
        const newBlock = new Block(item.block_data.index, item.block_data.transactions, item.block_data.timestamp, item.block_data.prevHash);
        const proof = item.block_data.hash;
        if (item.idx > 0) {
            const added = generatedBlockchain.addBlock(newBlock, proof);
            if (!added) throw new Error("Tampered with");
        } else {
            generatedBlockChain.chain.push(newBlock);
        }
    }
}

const consensus = () => {
    let longestChain = null;
    let currLen = bc.chain.chain.length;
    for (node in peers) {
        const options = {
            hostname: node,
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