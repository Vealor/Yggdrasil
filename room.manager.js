var helper = require('helper');

var RoomManager = {};

var owned = {}
var scouted = {}

RoomManager.add = function(room) {
  if (room.isOwned){
    owned.push(room)
  } else {
    scouted.push(room)
  }
};

RoomManager.get = function(name) {
  var intersect = helper.getIntersect(owned, scouted)
  if (intersect.length > 0) {
    console.log("ROOM ERROR - INTERSECTING DICTIONARIES")
  } else {
    var rooms = Object.assign({}, owned, scouted);
    if (rooms.hasOwnProperty(name)) {
      return rooms[name]
    } else {
      return false
    }
  }
};

RoomManager.getRooms = function() {
    return Object.assign({}, owned, scouted);
};

RoomManager.getOwnedRooms = function() {
  return owned;
};

RoomManager.getScoutedRooms = function() {
  return scouted;
};

RoomManager.requestReinforcement = function(room) {
    var rooms = this.getOwnedRooms();
    for(var n in rooms) {
        var r = rooms[n];
        if(r.room.name != room.room.name) {
            r.sendReinforcements(room);
        }

    }
};
module.exports = RoomManager;
