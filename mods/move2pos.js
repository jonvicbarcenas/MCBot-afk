import pathfinderPlugin from 'mineflayer-pathfinder'

const { pathfinder, Movements, goals } = pathfinderPlugin
const { GoalNear } = goals

let moveInterval;

export function setupMoveToPosition(bot, position1, position2) {
    bot.loadPlugin(pathfinder)
    const defaultMove = new Movements(bot)

    defaultMove.canDig = false;
    defaultMove.allowSprinting = false;
    bot.pathfinder.setMovements(defaultMove)

    let moveToPosition1 = true
    const moveBetweenPositions = () => {
        const goal = moveToPosition1 ? new GoalNear(position1.x, position1.y, position1.z, 1) : new GoalNear(position2.x, position2.y, position2.z, 1)
        bot.pathfinder.setGoal(goal)
        moveToPosition1 = !moveToPosition1
    }

    // Move between positions every 15 seconds
    moveInterval = setInterval(moveBetweenPositions, 15000)
}

export function stopMoveToPosition() {
    if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
}