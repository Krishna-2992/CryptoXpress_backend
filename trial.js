const axios = require('axios')

async function main() {
    // const SERVER_URL = 'https://cryptoxpress-back.onrender.com'
    const SERVER_URL = 'http://localhost:3000'
    const privateKey = 'cVk7yGjwmhxWBJYMZwpTnKTLtSpz3dP66NwMf635WKzNpgmpXAyi'
    console.log('wait...')
    const response = await axios(
        `${SERVER_URL}/calculatePublicKey?privateKey=${privateKey}`
    )
    console.log(response.data)
}
main()
