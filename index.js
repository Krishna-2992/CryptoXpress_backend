const express = require('express')

const app = express()
const {
    calculatePublicKey,
    bitcoinTransactions,
    transferBitcoin,
} = require('./bitcoinFunctions')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/calculatePublicKey', (req, res) => {
    res.send(calculatePublicKey(req.query.privateKey))
    res.status(200)
})

app.get('/bitcoinTransactions', (req, res) => {
    res.send(bitcoinTransactions(req.query.address))
    res.status(200)
})

app.get('/transferBitcoin', (req, res) => {
    const body = req.body
    transferBitcoin(body.sender, body.reciever, body.amount, body.privateKey)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        res.status(400).send(error.message);
    });
})

app.listen('3000', (req, res) => {
    console.log('Listening on port 3000')
})
