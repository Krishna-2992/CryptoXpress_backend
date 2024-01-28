const axios = require('axios')

async function main() {
    // const SERVER_URL = 'https://cryptoxpress-back.onrender.com'
    const SERVER_URL = 'http://localhost:3000'
    const privateKey = 'cVk7yGjwmhxWBJYMZwpTnKTLtSpz3dP66NwMf635WKzNpgmpXAyi'
    console.log('wait...')
    // const response = await axios(
    //     `${SERVER_URL}/calculatePublicKey?privateKey=${privateKey}`
    // )
    // console.log(response.data)

    //   const response = await axios.get(
    //     `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/mmazTKw3Xzix2ANqLHqtks3vp7y6HDxPp2/transactions`,
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-API-Key':
    //                 '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
    //         },
    //     }
    // )

    // const response = await axios({
    //     baseURL: `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/mpaUDErnGxdAZTK7UJvnWvB3YNz4LhqrzY/transactions`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-Key': '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
    //     },
    // })

    // const response = await axios({
    //   'http://localhost:3000/transferBitcoin?sender=mpaUDErnGxdAZTK7UJvnWvB3YNz4LhqrzY&reciever=n3sb3xSX65XexwZPAs5xm4HLRp747rton5&amount=0.0001&privateKey=cPNQoZ6Rhd6h3GJywCgCvdYRJ8S7MJ8BEKm4Z6JrgaPi1XvhhCyg'
    // })

    const url =
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    const apiKey = 'CG-BYgqb4WDQuAo2qFVhP3kq9HP	'
    const bitcoinPrice = await axios.get(url, {
        headers: {
            'X-CG-PRO-API-KEY': apiKey, // Add the API key header
        },
    })
    console.log(bitcoinPrice.data)
}
main()
