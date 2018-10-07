var buildingTower = {
  info: function(tower) {

  },
  // var towers = _.filter(Game.structures, function(structures){ return structures.structureType === 'tower';});
  action: function(tower) {
    var structures = tower.room.find(FIND_STRUCTURES);
    var toRepair = [];
    for(var structure in structures){
      // make structures to repair

      // can call this.repair and this.attack
      if( (structures[index].hits / structures[index].hitsMax) < 0.5 && (structures[index].structureType !== "constructedWall" || (structures[index].structureType == "constructedWall" && towers[0].energy > 900 && structures[index].hits < 3000000)) ){
  			toRepair.push(structures[index]);
  		}
    }
    if(toRepair.length>0 && towers[0].energy > 300){
  		towers[0].repair(toRepair[0])
  	}
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
    }
    var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        towers[0].attack(closestHostile);
    }
  },
  repair: function(tower) {
    // if(structures[index].hits < 50000 && structures[index].structureType === "constructedWall") {
	    //   toRepair.push(structures[index]);
    // }
    if( (structures[index].hits / structures[index].hitsMax) < 0.5 && (structures[index].structureType !== "constructedWall" || (structures[index].structureType == "constructedWall" && towers[0].energy > 900 && structures[index].hits < 3000000)) ){
      toRepair.push(structures[index]);
    }
			// if((structures[index].hits < 1000000 && (structures[index].structureType == "constructedWall") && towers[0].energy > 900){
			// 	toRepair.push(structures[index]);
			// }
  },
  attack: function(tower) {

  }
};

module.exports = buildingTower;
