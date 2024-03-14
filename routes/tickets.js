const router = require('express').Router()
const myDB = require('../db/db')

router.route('/t/:ticketId')
    .get((req, res) => {
        const ticketId = req.params.ticketId
        const ticket = myDB.findById(ticketId)

        res.status(200).json(ticket)
    })
    .delete((req, res) => {
        const ticketId = req.params.ticketId

        myDB.deleteById(ticketId)

        res.status(203).json({ message: 'Ticket deleted successfully' })
    })
    .patch((req, res) => {
        const ticketId = req.params.ticketId
        const updatedTicket = myDB.updateById(ticketId, req.body)

        res.status(201).json({ message: 'Ticket Updated Successfully', updatedTicket })
    })




router.route('/u/:username')
    .get((req, res) => {
        const username = req.params.username
        const tickets = myDB.findByUsername(username)

        res.status(200).json({ message: 'Success', tickets, total: tickets.length })
    })
    .patch()
    .delete()




router.post('/sell', (req, res) => {
    const { username, price } = req.body;
    const ticket = myDB.create(username, price)

    res.status(201).json({ message: 'Ticket Create Success', ticket })
})

router.post('/bulk', (req, res) => {
    const { username, price, quantity } = req.body;
    const tickets = myDB.bultCreate(username, price, quantity)

    res.status(201).json({ message: 'Bulk ticket create success', tickets, total: tickets.length })
})

router.get('/draw', (req, res) => {
    const quantity = req.query.wc ?? 3

    const winners = myDB.draw(quantity)

    res.status(200).json({ message: 'Winner count success', winners, total: winners.length })
})

router.get('/', ((_req, res) => {
    const tickets = myDB.find()

    res.status(200).json({ message: 'success', tickets, total: tickets.length })
}))

module.exports = router

