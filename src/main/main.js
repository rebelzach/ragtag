var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Decide if we need units
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 2) {
        console.log("Spawning Harvester");
        var newName = 'Harvester' + Game.time;
        Game.spawns[Object.keys(Game.spawns)[0]].spawnCreep(
            [WORK,CARRY,MOVE,MOVE],
            newName,
            {memory: {role: 'harvester'}});
    }
    else {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < 1) {
            console.log("Spawning Builder");
            var newName = 'Builder' + Game.time;
            Game.spawns[Object.keys(Game.spawns)[0]].spawnCreep(
                [WORK,CARRY,MOVE],
                newName,
                {memory: {role: 'builder'}});
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