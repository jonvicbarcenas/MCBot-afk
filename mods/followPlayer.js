import pathfinderPlugin from 'mineflayer-pathfinder'

const { pathfinder, Movements, goals } = pathfinderPlugin
const { GoalNear } = goals

export function followPlayer(bot, playerPos) {
    bot.loadPlugin(pathfinder)
    const defaultMove = new Movements(bot)

    defaultMove.canDig = true;
    defaultMove.allowSprinting = true;
    bot.pathfinder.setMovements(defaultMove)

    const goal = new GoalNear(playerPos.x, playerPos.y, playerPos.z, 1)
    console.log('Following player to:', goal)
    bot.pathfinder.setGoal(goal)
}
