"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@magikcraft/core");
var log_1 = require("@magikcraft/regenerate-spawn/lib/log");
var utils = require("utils");
var log = log_1.Logger(__filename);
log('@magikcraft/regenerate-spawn loaded!');
// @TODO make configurable via environment
// @TODO take a list of worlds to regen spawn points in
var periodMinutes = 5; // every 5 minutes
var radius = 3;
var regenerate = function () {
    log('Regenerating spawn...');
    var world = utils.world('world');
    var spawn = world.getSpawnLocation();
    var _a = spawn.getChunk(), x = _a.x, z = _a.z;
    var _loop_1 = function (dx) {
        var _loop_2 = function (dz) {
            setTimeout(function () {
                console.log("Regenerating " + dx + " " + dz);
                world.regenerateChunk(x + dx, z + dz);
            }, dx * dz * 500);
        };
        for (var dz = 0 - radius; dz < radius; dz++) {
            _loop_2(dz);
        }
    };
    for (var dx = 0 - radius; dx < radius; dx++) {
        _loop_1(dx);
    }
};
setTimeout(regenerate, periodMinutes * 60 * 1000);
global.__regenerate = regenerate;
log("Spawn Regeneration loaded with " + periodMinutes + " minute period");
log("Available as command: /regenerate-spawn");
core_1.commando('regenerate-spawn', function (args, player) {
    console.log("regenerate-spawn command called by " + player.name);
    regenerate();
    return true;
});
/**
 * Allows ops to blow up the spawn point (or any other location)
 * Can be used to test the regenerate-spawn functionality
 */
core_1.commando('blow', function (args, player) {
    if (!player.isOp()) {
        return;
    }
    console.log("blow command called by " + player.name);
    var here = player.getLocation();
    here.getWorld().createExplosion(here, 50);
    return true;
});
