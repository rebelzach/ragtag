var roleMaintenance = {
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
        
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('repair');
        }
        
        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length > 1) {
                var targetSource = creep.pos.findClosestByPath(sources);
                if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else 
        {
            var targets = creep.room.find(FIND_MY_STRUCTURES)
                .filter((structure) => {
                    return a.structureType === STRUCTURE_WALL || a.structureType === STRUCTURE_RAMPART;
                });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleMaintenance;
