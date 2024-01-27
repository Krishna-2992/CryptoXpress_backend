const express = require('express')

const app = express()
const { calculatePublicKey } = require('./bitcoinFunctions')

app.get('/', (req, res) => {

  res.send("Hello World")
})

app.get('/calculatePublicKey', (req, res) => {
  res.send(calculatePublicKey(req.query.privateKey))
  res.status(200)
})

app.listen('3000', (req, res) => {
  console.log("Listening on port 3000")
})