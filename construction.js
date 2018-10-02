var construction = {
    /** @param **/
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

module.exports = construction;