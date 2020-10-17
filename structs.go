package main

import (
	"crypto/sha256"
	"encoding/json"
	"time"
)

type xaction struct {
	GovID     int    `json: "gov_id"`
	Ballot    string `json: "ballot"`
	Name      string `json: "name"`
	Timestamp string `json: "timestamp"`
}

func (b block) computeHash(x []xaction) string {
	data, err := json.Marshal(x)
	if err != nil {
		panic(err)
	}
	return string(sha256.Sum256([]byte(data))[:])
}

type block struct {
	BlockID   int
	Xactions  []xaction
	Timestamp string
	PrevHash  string
	Hash      string
	Nonce     int
}

type blockchain struct {
	Chain      []block
	Difficulty int
}

func (bc blockchain) createGenesisBlock() {
	genesisBlock := block{0, make([]xaction, 0), time.Now().UTC().String(), "0", "", 0}
	genesisBlock.Hash = genesisBlock.computeHash(genesisBlock.Xactions)
	bc.Chain = append(bc.Chain, genesisBlock)
}

func (bc blockchain) lastBlock() block {
	return bc.Chain[len(bc.Chain)-1]
}

func (bc blockchain) proofOfWork(b block) {
	b.Nonce = 0
	hash := b.computeHash(b.Xactions)
}
