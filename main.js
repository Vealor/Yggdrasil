var constructionPlan = require('construction');
var spawnReplicate = require('spawn.replicate');

var roleGeneral = require('role.General');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

/* === TODO ===
   Make Tower specific function
   Gather all structure information in initialization
   Segregate all creeps so they are room specific
   allow for multiple towers
   
   add creep for extractor and labs
   
   Auto-build functions for:
    -Towers
    -storage
    -spawn
    -extensions
    -roads
    -extractor
    -labs
    
   Add code support for future creep types
   code support for multiple gathering nodes
   add harvester states for half empty
   Add incrementing repairs using a memory entry for structures
   auto-place rally points if required by other functions
   
 
*/


module.exports.loop = function () {
    console.log("-----------TICK");
    
    
    //road mapping run for new room
    // constructionPlan.buildRoads();

    // Tower control
    // need to add a memory to a wall with "highest health achieved!"
    var towers = _.filter(Game.structures, function(structures){ return structures.structureType === 'tower';});
    // console.log(towers);
    if(towers.length > 0) {
        var structures = towers[0].room.find(FIND_STRUCTURES);
		var toRepair = [];
		for(var index in structures){
		  //  if(structures[index].hits < 50000 && structures[index].structureType === "constructedWall")
		  //      toRepair.push(structures[index]);
			if( (structures[index].hits / structures[index].hitsMax) < 0.5 && (structures[index].structureType !== "constructedWall" || (structures[index].structureType == "constructedWall" && towers[0].energy > 900 && structures[index].hits < 3000000)) ){
				toRepair.push(structures[index]);
			}
// 			if((structures[index].hits < 1000000 && (structures[index].structureType == "constructedWall") && towers[0].energy > 900){
// 				toRepair.push(structures[index]);
// 			}
        }
        // console.log(toRepair);
		if(toRepair.length>0 && towers[0].energy > 300){
		    
			towers[0].repair(toRepair[0])
		}
        
        
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }

        var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers[0].attack(closestHostile);
        }
    }



    // Do stuff for units
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        roleGeneral.buildroad(creep);
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    // Unit Replication
    spawnReplicate.replicate();
    
}




