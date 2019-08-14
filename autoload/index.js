"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
var regenerate = function () { return __awaiter(_this, void 0, void 0, function () {
    var chunk, x, z, dx, dz;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                log('Regenerating spawn...');
                chunk = spawn.getChunk();
                x = chunk.getX();
                z = chunk.getZ();
                dx = 0 - radius;
                _a.label = 1;
            case 1:
                if (!(dx < radius)) return [3 /*break*/, 6];
                dz = 0 - radius;
                _a.label = 2;
            case 2:
                if (!(dz < radius)) return [3 /*break*/, 5];
                return [4 /*yield*/, setTimeout(function () { }, 1000)];
            case 3:
                _a.sent();
                console.log("Regenerating " + dx + " " + dz);
                world.regenerateChunk(x + dx, z + dz);
                _a.label = 4;
            case 4:
                dz++;
                return [3 /*break*/, 2];
            case 5:
                dx++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
setTimeout(regenerate, periodMinutes * 60 * 1000);
global.__regenerate = regenerate;
log("Spawn Regeneration loaded with " + periodMinutes + " minute period");
log("Available as command: /regenerate-spawn");
commando_1["default"]('regenerate-spawn', function (args, player) {
    console.log("regenerate-spawn command called by " + player.name);
    regenerate();
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
