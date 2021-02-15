const forge = require('node-forge');
const fs = require('fs')
const { CERTIFICATE_PATH } = require('./constants')

module.exports = function p7Encryptor(rawStringMessage){
    // create a p7 enveloped message
    const p7 = forge.pkcs7.createEnvelopedData();
    
    const certPem = fs.readFileSync(CERTIFICATE_PATH);
    // add a recipient
    const cert = forge.pki.certificateFromPem(certPem);
    p7.addRecipient(cert);
    
    // set content
    p7.content = forge.util.createBuffer(rawStringMessage);
    
    // encrypt
    p7.encrypt();
    
    // convert message to PEM
    const pem = forge.pkcs7.messageToPem(p7);
    
    return pem;
}
