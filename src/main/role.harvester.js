var roleHarvester = {
    run: function(creep) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
        
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('dumping');
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
            var buildersWithNeed = creep.room.find(FIND_MY_CREEPS, {
                filter: (someCreep) => {
                    return someCreep.memory.role === 'builder' && someCreep.carry.energy < someCreep.carryCapacity;
                }
            })
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    if ((structure.structureType == STRUCTURE_EXTENSION || 
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity) {
                        return true;
                    }
                    if (structure.structureType == STRUCTURE_CONTROLLER
                        && structure.progress < structure.progressTotal) {
                        return true;
                    }
                    return false;
                }
            }).sort((a, b) => {
                if (a.structureType == STRUCTURE_SPAWN || a.structureType == STRUCTURE_EXTENSION) 
                    return -1;
                return 1;
            });
            if(buildersWithNeed.length || structures.length) {
                var target;
                if (buildersWithNeed.length)
                    target = creep.pos.findClosestByPath(buildersWithNeed);
                else
                    target = creep.pos.findClosestByPath(structures);

                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
