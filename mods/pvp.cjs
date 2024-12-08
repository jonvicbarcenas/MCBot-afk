const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin

const config = require('../config.json')

const position1 = config.position1
const position2 = config.position2

async function autoPvp(bot) {
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(pvp)

    const { setupMoveToPosition, stopMoveToPosition } = await import('./move2pos.js')

    bot.on('chat', (username, message) => {
        if (message === 'fight me') {
            const player = bot.players[username]

            if (!player) {
                bot.chat("I can't see you.")
                return
            }

            stopMoveToPosition()
            bot.pvp.attack(player.entity)
            setTimeout(() => {
                const sword = bot.inventory.items().find(item => item.name.includes('sword'))
                if (sword) bot.equip(sword, 'hand')
            }, 150)
            bot.chat('Prepare to fight!')
        }

        if (message === 'stop') {
            bot.pvp.stop()
            bot.chat('okayyy')
            setupMoveToPosition(bot, position1, position2)
        }
    })
}

module.exports = {
    autoPvp
};