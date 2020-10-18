const express = require("express");
const path = require("path");
const {Blockchain, Block} = require('./blockchain');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname + "/frontend", "build")));
const bc = new Blockchain();
let peers = new Set();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend", "build", "index.html"));
});

app.get("/new_transaction", (req, res) => {
    let txData = req.body;
    let requiredFields = ["name", "ballot", "gov_id"];
    for (field in requiredFields) {
        if (!txData.field) {
            res.send(404);
        }
    }

    txData.timestamp = new Date(Date.now());;
    bc.addNewTransaction(txData);
    res.send(200);
});

app.get("/chain", (req, res) => {
    chainData = [];
    for (block in bc.chain) {
        chainData.append(block);
    }
    res.send(JSON.stringify(chainData));
});

app.get("/mine", (req, res) => {
    result = bc.mine();
    if (!result) res.send(400);
    // FINISH
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
    const headers = { "Content-Type": "application/json"};
    //FINISH THIS
});

const createChainFromDump = (chainDump) => {
    const generatedblockchain = new Blockchain();
    generatedblockchain.create_genesis_block();
    //FINISH THIS
}

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});