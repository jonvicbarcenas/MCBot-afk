const minecraftHawkEye = require('minecrafthawkeye');
const {autoPvp} = require('./pvp.cjs');
const config = require('../config.json');

const position1 = config.position1
const position2 = config.position2

var isFighting = false; // fast attack i guess that's why i put this
var MAX_DISTANCE = 12;

async function autoBow(bot) {
    const { setupMoveToPosition, stopMoveToPosition } = await import('./move2pos.js');
    bot.loadPlugin(minecraftHawkEye.default)

    const target = bot.nearestEntity(e => e.type === 'hostile');

    if (!target) {
        return false;
    }

    const distance = bot.entity.position.distanceTo(target.position);
    console.log(`Target distance: ${distance}`);

    // Stop HawkEye attack if already running
    bot.hawkEye.stop();

    if (distance > MAX_DISTANCE) {
        console.log('Target is too far away');
        setupMoveToPosition(bot, position1, position2)
        return false;
    }

    if (distance > 4 && distance < MAX_DISTANCE) {
        stopMoveToPosition();
        console.log('Bow range - attacking with bow');
        bot.hawkEye.autoAttack(target, 'bow');
    } 

    if (distance < 4) {
        isFighting = true;
        console.log("is fighting?: ", isFighting);
        stopMoveToPosition();
        if (isFighting) {
            autoPvp(bot);
        }
    }
}

module.exports = {
    autoBow
};