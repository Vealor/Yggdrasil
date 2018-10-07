// var Deposits = require('Deposits');
// var CreepFactory = require('CreepFactory');
// var Population = require('Population');
// var Resources = require('Resources');
// var Constructions = require('Constructions');

var buildingSpawn = require('building.spawn');
var buildingTower = require('building.tower');

var roleBase = require('role.base');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

function Room(RoomManager, room) {
  // room itself and main manager
	this.room = room;
	this.RoomManager = RoomManager;

  // room properties
  this.name = room.name;
  this.isOwned = room.controller.my;

  // contents of room
	this.creeps = [];
	this.structures = [];


	// this.population = new Population(this.room);
	// this.depositManager = new Deposits(this.room);
	// this.resourceManager = new Resources(this.room, this.population);
	// this.constructionManager = new Constructions(this.room);
	// this.population.typeDistribution.CreepBuilder.max = 4;
	// this.population.typeDistribution.CreepMiner.max = (this.resourceManager.getSources().length+1)*2;
	// this.population.typeDistribution.CreepCarrier.max = this.population.typeDistribution.CreepBuilder.max+this.population.typeDistribution.CreepMiner.max;
	// this.creepFactory = new CreepFactory(this.depositManager, this.resourceManager, this.constructionManager, this.population, this.roomHandler);
}



Room.prototype.replicate = function() {
  var spawns = this.room.find(FIND_MY_SPAWNS);
  if (spawns.length > 0) {
    // spawns[0]
    buildingSpawn.replicate();
  }
	// if(this.depositManager.spawns.length == 0 && this.population.getTotalPopulation() < 10) {
	// 	this.askForReinforcements()
	// }
  //
	// for(var i = 0; i < this.depositManager.spawns.length; i++) {
	// 	var spawn = this.depositManager.spawns[i];
	// 	if(spawn.spawning) {
	// 		continue;
	// 	}
  //
	// 	if((this.depositManager.energy() / this.depositManager.energyCapacity()) > 0.2) {
	// 		var types = this.population.getTypes()
	// 		for(var i = 0; i < types.length; i++) {
	// 			var ctype = this.population.getType(types[i]);
	// 			if(this.depositManager.deposits.length > ctype.minExtensions) {
	// 				if((ctype.goalPercentage > ctype.currentPercentage && ctype.total < ctype.max) || ctype.total == 0 || ctype.total < ctype.max*0.75) {
	// 					this.creepFactory.new(types[i], this.depositManager.getSpawnDeposit());
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

};

Room.prototype.runCreeps = function() {
  var creeps = this.room.find(FIND_MY_CREEPS);
  for(var name in creeps) {
    var creep = creeps[name];

    roleBase.buildroad(creep);

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
};

Room.prototype.runStructures = function() {
  var structures = this.room.find(FIND_MY_STRUCTURES);
  for (var i in structures) {
    if (structures[i].structureType === 'tower') {
      // buildingTower.action(structures[i]);
    }
  }
};

// Room.prototype.askForReinforcements = function() {
// 	console.log(this.room.name + ': ask for reinforcements.');
// 	this.roomHandler.requestReinforcement(this);
// };

// Room.prototype.sendReinforcements = function(room) {
// 	if(!Memory[this.room.name]) {
// 		Memory[this.room.name] = {};
// 	}
// 	var alreadySending = false;
// 	for(var i = 0; i < this.population.creeps.length; i++) {
// 		var creep = this.population.creeps[i];
// 		if(creep.memory.targetRoom == room.room.name) {
// 			alreadySending = true;
// 			break;
// 		}
// 	}
// 	if(alreadySending) {
// 		console.log(this.room.name + ': already given reinforcements');
// 		return;
// 	}
// 	if(this.population.getTotalPopulation() < this.population.getMaxPopulation()*0.8) {
// 		console.log(this.room.name + ': Not enough resources ' + '(' + this.population.getTotalPopulation() + '/' + this.population.getMaxPopulation()*0.8 + ')');
// 		return;
// 	}
//
// 	var sentType = [];
// 	for(var i = 0; i < this.population.creeps.length; i++) {
// 		var creep = this.population.creeps[i];
// 		if(creep.ticksToLive < 1000) {
// 			continue;
// 		}
// 		if(sentType.indexOf(creep.memory.role) == -1) {
// 			sentType.push(creep.memory.role);
// 			console.log('sending: ' + creep.memory.role);
// 			creep.memory.targetRoom = room.room.name;
// 		}
// 	}
// }

module.exports = Room;
