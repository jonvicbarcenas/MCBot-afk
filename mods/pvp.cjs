const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin

async function autoPvp(bot) {
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(pvp)

    const target = bot.nearestEntity(e => e.type === 'hostile');
    const sword = await bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword){
        await bot.equip(sword, 'hand')
    }
    bot.pvp.attack(target)
    bot.chat('close range!! using sword')
}

module.exports = {
    autoPvp
};