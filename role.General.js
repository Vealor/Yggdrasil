var roleGeneral = {

    /** @param {Creep} creep **/
    buildroad: function(creep) {
        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    }
};

module.exports = roleGeneral;