var roleHarvester = {

    //make function for multiple sources in room to spread out evenly...

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);

            //what if source is empty?!
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {

            //prioritize extensions > Tower > spawn !
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                    }
            });
            // console.log(targets);
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                });

                // console.log(targets);
                // console.log(creep.room.storage.store[RESOURCE_ENERGY]);
                targets.every(function(tower){
                    // console.log("TOWER " + tower.energy);
                    // if(tower.energy > creep.room.storage.store[RESOURCE_ENERGY]){
                    //     var i = targets.indexOf(tower);
                    //     if(i!=-1){
                    //         targets.splice(i,1);
                    //     }
                    // }
                    // console.log(targets);
                });
            }
            // console.log(targets);
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE);
                        }
                });
            }
            // console.log(targets);
            if(targets.length == 0) {
                targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                        }
                });
            }
            // console.log(targets);

            // console.log(targets[0]);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;
