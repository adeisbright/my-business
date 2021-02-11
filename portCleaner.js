const normalizePort = val => {
    const portNumber = parseInt(val , 10) 
    switch(true){
        case isNaN(portNumber) : 
            return val 
            break;
        case portNumber >= 0 : 
            return portNumber 
            break;
        default :
            return false
    }
} 
module.exports = normalizePort