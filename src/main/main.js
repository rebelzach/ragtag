var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleMaintenance = require('role.maintenance');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Decide if we need units
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 5) {
        console.log("Spawning Harvester");
        var newName = 'Harvester' + Game.time;
        Game.spawns[Object.keys(Game.spawns)[0]].spawnCreep(
            [WORK,CARRY,MOVE,MOVE],
            newName,
            {memory: {role: 'harvester'}});
    }
    else {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < 2) {
            console.log("Spawning Builder");
            var newName = 'Builder' + Game.time;
            Game.spawns[Object.keys(Game.spawns)[0]].spawnCreep(
                [WORK,WORK,CARRY,MOVE],
                newName,
                {memory: {role: 'builder'}});
        }
        var maintenance = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintenance');
        if (builders.length < 2) {
            console.log("Spawning Maintenance");
            var newName = 'Maintenance' + Game.time;
            Game.spawns[Object.keys(Game.spawns)[0]].spawnCreep(
                [WORK,WORK,CARRY,MOVE],
                newName,
                {memory: {role: 'maintenance'}});
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}