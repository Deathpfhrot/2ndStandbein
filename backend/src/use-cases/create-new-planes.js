const { insertOne } = require("../db-access/planes-dao")
const { makePlane } = require("../domain/Airplane")


function createNewPlane(planesInfo){
    
    const plane = makePlane(planesInfo)

    return insertOne(plane)
}

module.exports = {
    createNewPlane
}