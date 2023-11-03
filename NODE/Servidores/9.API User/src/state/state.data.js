let testEmailSend = false // por defecto ponemos false

const setSendEmail = (dataBoolean)=>{
    testEmailSend = dataBoolean
}

const getSendEmail = ( )=>{
    return testEmailSend
}

module.exports ={
    getSendEmail,
    setSendEmail
}