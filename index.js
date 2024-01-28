const express = require('express')

const {
  calculatePublicKey,
  bitcoinTransactions,
  transferBitcoin,
} = require('./bitcoinFunctions')

const app = express()
app.use(express.json());

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
  if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Request body is empty');
  }

  console.log('fsjdfhfjs')
  console.log(req.body)

  const { sender, receiver, amount, privateKey } = req.body;
  transferBitcoin(sender, receiver, amount, privateKey) 
  res.send('fdh ')
});

app.get('/transferBitcoin', (req, res) => {
    const body = req
     // Ensure that the body-parser is properly configured to parse JSON data

    // transferBitcoin(body.sender, body.reciever, body.amount, body.privateKey)
    // .then(result => {
    //     res.status(200).send(result);
    // })
    // .catch(error => {
    //     res.status(400).send(error.message);
    // });
})

app.listen('3000', (req, res) => {
    console.log('Listening on port 3000')
})
