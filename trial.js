const axios = require('axios')

async function main() {
    // const SERVER_URL = 'https://cryptoxpress-back.onrender.com'
    const SERVER_URL = 'http://localhost:3000'
    console.log('wait...')

    const response = await axios.post('http://localhost:3000/transferBitcoin', {
        data: {
            sender: 'mpaUDErnGxdAZTK7UJvnWvB3YNz4LhqrzY',
            receiver: 'n3sb3xSX65XexwZPAs5xm4HLRp747rton5',
            amount: 0.0001,
            privateKey: 'cPNQoZ6Rhd6h3GJywCgCvdYRJ8S7MJ8BEKm4Z6JrgaPi1XvhhCyg',
        },
    })

    // const response = await axios('http://localhost:3000')

    console.log('transaction response', response.data)
}
main()
