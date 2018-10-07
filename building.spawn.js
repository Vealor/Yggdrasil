const max_builders   = 4;
const max_harvesters = 4;
const max_upgraders  = 2;

var buildingSpawn = {

    /** @param {Creep} creep 3**/
    replicate: function(spawn) {

        // Unit Replication
        //##################
        // harvester init
        var harvesters     = _.filter(Game.creeps,   function(creep){ return creep.memory.role === 'harvester';});
        var harvesterNames = [];  _.each(harvesters, function(creep){harvesterNames.push(creep.name);});
        // upgrader init
        var upgraders      = _.filter(Game.creeps,   function(creep){ return creep.memory.role === 'upgrader';});
        var upgraderNames  = [];  _.each(upgraders,  function(creep){upgraderNames.push(creep.name);});
        // builder init
        var builders       = _.filter(Game.creeps,   function(creep){ return creep.memory.role === 'builder';});
        var builderNames   = [];  _.each(builders,   function(creep){builderNames.push(creep.name);});

        // SIMPLY FOR PRINTING
        harvesterprint = [];
        _.each(harvesters,function(creep){harvesterprint.push("  "+creep.name + "::" +creep.ticksToLive);});
        upgraderprint = [];
        _.each(upgraders,function(creep){upgraderprint.push("  "+creep.name + "::" +creep.ticksToLive);});
        builderprint = [];
        _.each(builders,function(creep){builderprint.push("  "+creep.name + "::" +creep.ticksToLive);});
        console.log("Harvesters: "+harvesters.length+"/"+max_harvesters+" >> "+harvesterprint.sort());
        console.log("Upgraders:  "+upgraders.length+"/"+max_upgraders+" >> "+upgraderprint.sort());
        console.log("Builders:   "+builders.length+"/"+max_builders+" >> "+builderprint.sort());

        if(harvesters.length < max_harvesters){
            console.log("Trying to make a harvester")
            for(var i = 1;i<=max_harvesters;i++){
                if(harvesterNames.indexOf("Harvester"+i) == -1){
                    // Game.spawns.Yggdrasil.createCreep( [WORK, CARRY, MOVE], 'Harvester'+i, { role: 'harvester' } );
                    Game.spawns.Yggdrasil.createCreep( [WORK, WORK, CARRY, MOVE], 'Harvester'+i, { role: 'harvester' } );
                    // Game.spawns.Yggdrasil.createCreep( [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], 'Harvester'+i, { role: 'harvester' } );
                }
            }
        }else if(upgraders.length < max_upgraders){
            console.log("Trying to make an upgrader")
            for(var i = 1;i<=max_upgraders;i++){
                if(upgraderNames.indexOf("Upgrader"+i) == -1){
                    // Game.spawns.Yggdrasil.createCreep( [WORK, CARRY, MOVE], 'Upgrader'+i, { role: 'upgrader' } );
                    Game.spawns.Yggdrasil.createCreep( [WORK, WORK, CARRY, MOVE], 'Upgrader'+i, { role: 'upgrader' } );
                    // Game.spawns.Yggdrasil.createCreep( [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'Upgrader'+i, { role: 'upgrader' } );
                }
            }
        }else if(builders.length < max_builders){
            console.log("Trying to make a builder")
            for(var i = 1;i<=max_builders;i++){
                if(builderNames.indexOf("Builder"+i) == -1){
                    // Game.spawns.Yggdrasil.createCreep( [WORK, CARRY, MOVE], 'Builder'+i, { role: 'builder' } );
                    Game.spawns.Yggdrasil.createCreep( [WORK, WORK, CARRY, MOVE], 'Builder'+i, { role: 'builder' } );
                    // Game.spawns.Yggdrasil.createCreep( [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], 'Builder'+i, { role: 'builder' } );
                }
            }
        }else{
            console.log("All creeps created.")
        }
    }
};

module.exports = buildingSpawn;
