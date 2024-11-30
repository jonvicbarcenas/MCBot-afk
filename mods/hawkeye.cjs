const minecraftHawkEye = require('minecrafthawkeye');

async function autoBow(bot) {

    bot.loadPlugin(minecraftHawkEye.default)
    // const target = bot.hawkEye.getPlayer();

    const target = bot.nearestEntity(e => e.type === 'hostile');

    // console.log(target);
    if (!target) {
        return false;
    }

    const weapon = 'bow';

    const distance = bot.entity.position.distanceTo(target.position);
    console.log(distance);
    if (distance > 15) {
        console.log('Target is too far away');
        bot.hawkEye.stop();
        return false;
    }else{
        console.log('Target is close');
        bot.hawkEye.autoAttack(target, weapon);
    }


}

module.exports = {
    autoBow
};