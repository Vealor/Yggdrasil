var roleBuilder = {
  run: function(creep) {

    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }

      var structures = creep.room.find(FIND_STRUCTURES);
	var toRepair = [];
	var buildSites = creep.room.find(FIND_CONSTRUCTION_SITES);
	for(var index in structures){
	  //  console.log(structures[index].structureType);

	    //need to increment! (start at 1000, if all walls >1000, bring up to say 5000, etc..)
	    if(structures[index].hits < 3000000 && structures[index].structureType === "constructedWall")
	        toRepair.push(structures[index]);
		if((structures[index].hits / structures[index].hitsMax) < 0.5 && structures[index].structureType !== "constructedWall")
			toRepair.push(structures[index]);
	}
// 		console.log(toRepair);

	if(toRepair.length>0 && buildSites.length == 0){
		if(creep.repair(toRepair[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(toRepair[0]);
		}
	}

	if(creep.memory.building) {

          if(buildSites.length) {
              if(creep.build(buildSites[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(buildSites[0]);
              }
          }
      }else{
          var targets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy == structure.energyCapacity;
              }
          });
          if(creep.room.storage.store[RESOURCE_ENERGY]>0){
              if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY,50) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.storage);
              }
          }else if(targets){
              if(creep.withdraw(targets[0], RESOURCE_ENERGY,50) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets[0]);
              }

          }else{
              var sources = creep.room.find(FIND_SOURCES);
              if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(sources[0]);
              }
          }
      }
  },
  doRoad: function(from, to){
      // console.log(from.constructor.name);
    var path = Game.spawns.Yggdrasil.room.findPath(from, to, { ignoreCreeps: true });
	  for(var i in path){
			var result = Game.spawns.Yggdrasil.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},
  buildRoads: function() {
      var sources = Game.spawns.Yggdrasil.room.find(FIND_SOURCES);
      for(var i in sources){
  		this.doRoad(Game.spawns.Yggdrasil.pos, sources[i].pos);
  		this.doRoad(Game.spawns.Yggdrasil.room.controller.pos, sources[i].pos);
  	}
  },
};

module.exports = roleBuilder;
