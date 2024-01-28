const express = require('express')

const {
    calculatePublicKey,
    bitcoinTransactions,
} = require('./bitcoinFunctions')

const { transferBitcoin } = require('./sendTransaction')

const app = express()
app.use(express.json())

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

app.get('/transferBitcoin', async (req, res) => {
    console.log(req.body)
    const { sender, receiver, amount, privateKey } = req.body
    const result = await transferBitcoin(privateKey, amount, receiver, 'testnet', sender)
    res.status(200).send(result)
})

app.listen('3000', (req, res) => {
    console.log('Listening on port 3000')
})
