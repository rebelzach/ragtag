var roleBuilder = {
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Waiting');
        }
        
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            // First check for highly damaged nearby structures
            // and repair them
            var lowDamageTargets = creep.room.find(FIND_MY_STRUCTURES)
                .filter((a) => {
                    return a.structureType === STRUCTURE_WALL || a.structureType === STRUCTURE_RAMPART;
                })
                .filter(t => t.hits < 900);

            if(lowDamageTargets.length > 0) {
                var target = creep.pos.findClosestByPath(lowDamageTargets);
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00ff00'}});
                }
                return; // this is the only thing we will do this tick
            }
            
            // Do building
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
                .sort((a, b) => {
                    if (a.structureType === STRUCTURE_WALL)
                        return -1;
                    if (a.structureType === STRUCTURE_RAMPART)
                        return -1;
                    return 1;
                });
            if(targets.length) {
                var target = creep.pos.findClosestByPath(targets);
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}});
                }
            }
        }
        else {
            // var sources = creep.room.find(FIND_SOURCES);
            // var harvestResult = creep.harvest(sources[0]);
            // if(harvestResult == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
        }
    }
};

module.exports = roleBuilder;
