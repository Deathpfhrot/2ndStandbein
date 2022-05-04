const { findByID } = require("../db-access/planes-dao");

function showPlane({ planeId }){
    console.log(planeId);
    return findByID(planeId)
    .then((plane) => planeToPlaneView(plane))
}

// bekommt er das plane von hier oben oder nur ein parameter in planeToPlaneView

function planeToPlaneView(plane){
    console.log("inside plane", plane);
    const planeCopy = {...plane}

    //sensteive information/felder löschen
    delete planeCopy.stock

    //neue felter anlegen
    planeCopy.isAvailible = plane.stock > 0
    planeCopy.isLimited = plane.stock < 10

    return planeCopy
}

module.exports = {
    planeToPlaneView,
    showPlane
}