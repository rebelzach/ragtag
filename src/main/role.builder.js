var roleBuilder = {
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            //creep.memory.building = false;
            creep.say('Waiting');
        }
        
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
                .sort((a, b) => {
                    if (a.structureType === STRUCTURE_WALL)
                        return -1;
                    if (a.structureType === STRUCTURE_RAMPART)
                        return -1;
                    return 1;
                });
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var harvestResult = creep.harvest(sources[0]);
            if(harvestResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;
