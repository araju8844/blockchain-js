// ./src/block.js
// * Contains the class definition for a single block.

// * Imports
const crypto = require("crypto"); // Used for encryption algorithms; Built-in
// Define a SHA256 hash function from our crypto library
function SHA256(message) {
    crypto
        .createHash("sha256") // Set the hashing algorithm to SHA256
        .update(message) // Update the hash with the message
        .digest("hex"); // Return the hash as a hexadecimal string
}

class Block {
    constructor(timestamp = "", transactions = []) {
        this.timestamp = timestamp;
        this.transactions = transactions; // Transaction list
        this.hash = this.getHash(); // Current block's hash
        this.prevHash = ""; // Previous block's hash
        this.nonce = 0; // Some random value for mining purposes
    }

    // Returns the hash of the current block
    getHash() {
        // Hash together...
        return SHA256(
            this.prevHash + // The previous hash,
                this.timestamp + // The timestamp of the block,
                JSON.stringify(this.transactions) + // And all transactions
                this.nonce // And let's toss in some random nonce for fun
        );
    }

    // Mine a new block (generate a hash that works)
    mine(difficulty) {
        // Let's loop until our hash starts with a string 0...000
        //  The length of this string is set through difficulty
        let checkString = Array(difficulty + 1).join("0");

        while (!this.hash.startsWith(checkString)) {
            // Increase the nonce so we get a whole different hash
            this.nonce++;

            // Recompute the entire hash
            this.hash = this.getHash();
        }
    }
}

module.exports = Block;
