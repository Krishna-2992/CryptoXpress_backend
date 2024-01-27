const bitcore = require('bitcore-lib')
const axios = require('axios')

const calculatePublicKey = (privateKey) => {
    privateKey = bitcore.PrivateKey.fromWIF(privateKey)
    const publicKey = privateKey.toPublicKey()
    const compressedPublicKeyString = publicKey.toString()
    return compressedPublicKeyString
}



module.exports = { calculatePublicKey }
