const shortId = require('shortid')

class Ticket {
    /**
     * ticket constructor function
     * @param {string} username 
     * @param {number} price 
     */
    constructor(username, price) {
        this.id = shortId.generate();
        this.name = username;
        this.price = price;
        this.createdAt = new Date();
        this.updatedAt = new Date()

    }
}

module.exports = Ticket