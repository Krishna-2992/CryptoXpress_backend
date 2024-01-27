const axios = require('axios')

async function main() {
    const SERVER_URL = 'https://cryptoxpress-back.onrender.com'
    const privateKey = 'cVk7yGjwmhxWBJYMZwpTnKTLtSpz3dP66NwMf635WKzNpgmpXAyi'
    console.log('wait...')
    // const response = await axios(
    //     `${SERVER_URL}/calculatePublicKey?privateKey=${privateKey}`
    // )
    const response = await axios('https://catfact.ninja/fact')
    console.log(response)
    console.log(response.data)
}
main()
