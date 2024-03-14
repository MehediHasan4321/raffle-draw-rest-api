const Ticket = require('../models/models')

class MyDB {
    constructor() {
        this.tickets = []
    }

    /**
     * Create and save a new Ticket by passing user name and price 
     * @param {string} username pass username 
     * @param {number} price pass ticket price
     * @returns {Ticket}
     */


    create(username, price) {

        const ticket = new Ticket(username, price)
        this.tickets.push(ticket)


        return ticket
    }

    /**
     * Create multiputle ticket for a single user
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Ticket[]}
     */


    bultCreate(username, price, quantity) {

        const result = []

        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price)
            result.push(ticket)
        }

        return result

    }

    /**
     * Find all ticket are avaitable
     * @returns {Ticket[]}
     */


    find() {
        return this.tickets
    }


    /**
     * Find a single ticket by ticket id
     * @param {string} id
     * @returns {Ticket}
     */

    findById(id) {

        const findTicket = this.tickets.find(item => item.id === id)

        return findTicket

    }

    /**
     * Find all ticket for given user
     * @param {string} username 
     * @returns {Ticket[]}
     */

    findByUsername(username) {
        const findTickets = this.tickets.filter(ticket => ticket.username === username)


        return findTickets
    }


    /**
     * Update a single ticket by ticket id
     * @param {string} id 
     * @param {{username:string,price:number}} body 
     * @returns {Ticket}
     */
    updateById(id, body) {
        const ticket = this.findById(id)

        ticket.name = body.username ?? ticket.name;
        ticket.price = body.price ?? ticket.price
        ticket.updatedAt = new Date()

        return ticket
    }

    /**
     * Update tickets for given user name
     * @param {string} username 
     * @returns {Ticket[]}
     */
    updateByUsername(username) {

    }

    /**
     * Deleta a single ticket by ticket id
     * @param {string} ticketId
     * @returns {boolean} 
     */

    deleteById(ticketId) {
        const index = this.tickets.findIndex(item => item.id === ticketId)

        if (index !== -1) {
            this.tickets.splice(index, 1)
            return true
        } else {
            return false
        }
    }

    deleteByUsername(username) {

    }

    /**
     * Get the winner 
     * @param {string} winnerCount 
     * @returns {Ticket[]}
     */

    draw(winnerCount) {

        const windderIndexes = new Array(Number(winnerCount))
        
        let index = 0;

        while(index<windderIndexes.length){
            let winnerIndex = Math.floor(Math.random()*this.tickets.length)
            if(!windderIndexes.includes(winnerIndex)){
                windderIndexes[index++] = winnerIndex
                continue
            }
            
        }
        
        const winners= windderIndexes.map(index=>this.tickets[index])
        
        return winners

       
    }
}

const myDB = new MyDB()

module.exports = myDB