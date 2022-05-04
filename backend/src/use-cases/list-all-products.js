const { findAllPlanes } = require("../db-access/planes-dao");

function listAllPlanes(){
    return findAllPlanes()
    .then(planes => planes.map(p => ({
        _id: p._id,
        title: p.title, 
        category: p.category,
        description: p.description,
        variations: p.variations,
        price: p.price,
        isAvailible: p.stock > 0,
        isLimited: p.stock < 10,
        image: p.image
    })))
}

module.exports = {
    listAllPlanes
}