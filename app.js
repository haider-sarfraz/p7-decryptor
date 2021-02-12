var forge = require('node-forge');
var fs = require('fs')

module.exports = function p7Decryptor({messageBody,privateKeyFilePath,passPhrase='password'}){
    let data = `-----BEGIN PKCS7-----\r\n${messageBody}\r\n-----END PKCS7-----\r\n`;
    
    let p7d = forge.pkcs7.messageFromPem(data)
    
    let privateCert = forge.pki.decryptRsaPrivateKey(fs.readFileSync(privateKeyFilePath),passPhrase);
    
    p7d.decrypt(p7d.recipients[0], privateCert);
    
    const decryptedData = p7d.content.data
    
    return decryptedData
}
