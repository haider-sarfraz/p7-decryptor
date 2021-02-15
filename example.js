const p7Encryptor = require('./encrypt')
const p7Decryptor = require('./decrypt');
const { PRIVATE_KEY_PATH } = require('./constants')

const EXAMPLE_RAW_MSG = "Simple Tutorial"

const encryptedMessage = p7Encryptor(EXAMPLE_RAW_MSG)
const decryptedMessage = p7Decryptor({
    messageBody: encryptedMessage,
    privateKeyFilePath: PRIVATE_KEY_PATH
})

console.log(`
Original Msg  ===> ${EXAMPLE_RAW_MSG}\r\n
ENCRYPTED Msg ===> ${encryptedMessage}\r\n
DECRYPTED Msg ===> ${decryptedMessage}\r\n
`)
