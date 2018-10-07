var RoomManager = require('room.manager'); // manages all room function passing
var Room = require('room'); // room constructor and management

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
// =============================================================================
// LOAD ROOMLIST ===============================================================
  for (var i in Game.rooms) {
    var roomBuilder = new Room(RoomManager, Game.rooms[i])
    RoomManager.add(roomBuilder)
  }

// =============================================================================
// ACTION OWNED ROOMS ==========================================================
  var rooms = RoomManager.getOwnedRooms();
  for (var n in rooms) {
    console.log("~~Running room "+rooms[n].name)
    rooms[n].replicate();
    rooms[n].runCreeps();
    rooms[n].runStructures();
  }

// =============================================================================
// ACTION SCOUTED ROOMS ========================================================
  var rooms = RoomManager.getScoutedRooms();
  for (var n in rooms) {
    console.log("~~Scouting room "+rooms[n].name)
    // do stuff
  }
}
