"use strict";
exports.__esModule = true;
var commando_1 = require("@magikcraft/commando");
var log_1 = require("@magikcraft/regenerate-spawn/lib/log");
var utils = require("utils");
var log = log_1.Logger(__filename);
log('@magikcraft/regenerate-spawn loaded!');
// @TODO make configurable via environment
// @TODO take a list of worlds to regen spawn points in
var periodMinutes = 5; // every 5 minutes
var radius = 3;
var world = utils.world('world');
var spawn = world.getSpawnLocation();
var chunk = spawn.getChunk();
var x = chunk.getX();
var z = chunk.getZ();
var _loop_1 = function (dx) {
    var _loop_2 = function (dz) {
        setInterval(function () {
            console.log("Regenerating " + dx + " " + dz);
            world.regenerateChunk(x + dx, z + dz);
        }, periodMinutes * 60000 + dx * 100);
    };
    for (var dz = 0 - radius; dz < radius; dz++) {
        _loop_2(dz);
    }
};
for (var dx = 0 - radius; dx < radius; dx++) {
    _loop_1(dx);
}
log("Spawn Regeneration loaded with " + periodMinutes + " minute period");
log("Available as command: /regenerate-spawn");
commando_1["default"]('regenerate-spawn', function (args, player) {
    console.log("regenerate-spawn command called by " + player.name);
    for (var dx = 0 - radius; dx < radius; dx++) {
        for (var dz = 0 - radius; dz < radius; dz++) {
            world.regenerateChunk(x + dx, z + dz);
        }
    }
    return true;
});
/**
 * Allows ops to blow up the spawn point (or any other location)
 * Can be used to test the regenerate-spawn functionality
 */
commando_1["default"]('blow', function (args, player) {
    if (!player.isOp()) {
        return;
    }
    console.log("blow command called by " + player.name);
    var here = player.getLocation();
    here.getWorld().createExplosion(here, 50);
    return true;
});
