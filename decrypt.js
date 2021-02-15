const forge = require('node-forge');
const fs = require('fs')
const { DECRYPTOR, PRIVATE_KEY_PATH } = require('./constants')

module.exports = function p7Decryptor({
    messageBody,
    privateKeyFilePath=PRIVATE_KEY_PATH,
    passPhrase=DECRYPTOR.PASS_PHRASE
}){
    
    let data = initP7Message(messageBody)
    
    let p7d = forge.pkcs7.messageFromPem(data)
    
    let privateCert = forge.pki.decryptRsaPrivateKey(fs.readFileSync(privateKeyFilePath),passPhrase);
    
    p7d.decrypt(p7d.recipients[0], privateCert);
    
    const decryptedData = p7d.content.data
    
    return decryptedData
}

function initP7Message(messageBody){
    return (isP7WrapperAttached(messageBody))
        ? messageBody
        : addP7Wrapper(messageBody)
}

function isP7WrapperAttached(messageBody){
    return (messageBody.match(/-----BEGIN PKCS7-----/g) && messageBody.match(/-----END PKCS7-----/g))
}

function addP7Wrapper(messageBody){
    return `${DECRYPTOR.P7_MSG_PREFIX}\r\n${messageBody}\r\n${DECRYPTOR.P7_MSG_POSTFIX}\r\n`
}