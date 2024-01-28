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

    console.log('transactions', response.data.data.items[0].senders)
}

let transferBitcoin = async (
    senderAddress,
    receiverAddress,
    amountToSend,
    privateKey
) => {
    // const privateKey = `cVk7yGjwmhxWBJYMZwpTnKTLtSpz3dP66NwMf635WKzNpgmpXAyi` // your privateKey -- the one we just generated

    // const sourceAddress = `mrk7D6n8QGnEjbkNt57nXvzz2CACebNv1r`

    try {
        const satoshiToSend = amountToSend * 100000000
        let fee = 0
        let inputCount = 0
        let outputCount = 2 // we are going to use 2 as the output count because we'll only send the bitcoin to 2 addresses the receiver's address and our change address.

        const response = await axios({
            baseURL: `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${senderAddress}/transactions`,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
            },
        })

        const transaction = new bitcore.Transaction()
        let totalAmountAvailable = 0

        let inputs = []
        let utxos = response.data.data.items

        for (const element of utxos) {
            let utxo = {}
            utxo.satoshis = Math.floor(
                parseFloat(element.blockchainSpecific.vout[0].value) * 100000000
            )
            utxo.script = element.blockchainSpecific.vout[0].scriptPubKey.hex
            utxo.address =
                element.blockchainSpecific.vout[0].scriptPubKey.addresses[0]
            utxo.txId = element.transactionId
            utxo.outputIndex = element.index

            totalAmountAvailable += utxo.satoshis
            inputCount += 1
            inputs.push(utxo)
        }

        const transactionSize =
            inputCount * 180 + outputCount * 34 + 10 - inputCount
        fee = transactionSize * 60

        if (totalAmountAvailable - satoshiToSend - fee < 0) {
            console.log(totalAmountAvailable)
            console.log(satoshiToSend)
            console.log(fee)
            throw new Error('Balance is too low for this transaction')
        }

        transaction.from(inputs)
        transaction.to(receiverAddress, satoshiToSend)
        transaction.fee(fee)
        transaction.change(senderAddress)
        transaction.sign(privateKey)
        let serializedTransaction = transaction.serialize()

        // // broadcast transaction
        const result = await axios({
            method: 'POST',
            url: `https://rest.cryptoapis.io/blockchain-tools/bitcoin/testnet/transactions/broadcast`,
            data: {
                data: {
                    item: {
                        signedTransactionHex: serializedTransaction,
                    },
                },
            },
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
            },
        })
        console.log('label222')
        console.log(result.data)
        return result.data.data
    } catch (error) {
        console.log(error)
        console.log('💥💥💥💥💥')
        return 'error'
    }
}

module.exports = { calculatePublicKey, bitcoinTransactions, transferBitcoin }
