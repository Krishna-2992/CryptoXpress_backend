const bitcore = require('bitcore-lib')
const axios = require('axios')

const calculatePublicKey = (privateKey) => {
    privateKey = bitcore.PrivateKey.fromWIF(privateKey)
    const publicKey = privateKey.toPublicKey()
    const address = publicKey.toAddress()
    console.log('address is', address.toString())
    return address.toString()
}

const bitcoinTransactions = async (address) => {
    const response = await axios({
        baseURL: `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${address}/transactions?`,
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
        },
    })

    console.log('transactions',response.data.data.items)
}

module.exports = { calculatePublicKey, bitcoinTransactions }
