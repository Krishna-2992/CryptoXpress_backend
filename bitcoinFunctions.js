const bitcore = require('bitcore-lib')
const axios = require('axios')

const calculatePublicKey = (privateKey) => {
    privateKey = bitcore.PrivateKey.fromWIF(privateKey)
    const publicKey = privateKey.toPublicKey()
    const address = publicKey.toAddress()
    console.log('address is', address.toString())
    return address
}

const bitcoinTransactions = (publicKey) => {
    const url = `https://blockstream.info/api/address/${publicKey}/txs`
    const response = axios.get(url)
    console.log(response.data)
    return response
}

module.exports = { calculatePublicKey }
