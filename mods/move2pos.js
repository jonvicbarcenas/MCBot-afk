import pathfinderPlugin from 'mineflayer-pathfinder'

const { pathfinder, Movements, goals } = pathfinderPlugin
const { GoalNear } = goals

let moveInterval;

var position1, position2;

export function setupMoveToPosition(bot, pos1, pos2) {
    bot.loadPlugin(pathfinder)
    const defaultMove = new Movements(bot)


    position1 = pos1
    position2 = pos2

    if(position1 == null || position2 == null) {
        return
    }

    defaultMove.canDig = false;
    defaultMove.allowSprinting = false;
    bot.pathfinder.setMovements(defaultMove)

    let moveToPosition1 = true
    const moveBetweenPositions = () => {
        if (position1 == null || position2 == null) {
            return
        }
        const goal = moveToPosition1 ? new GoalNear(position1.x, position1.y, position1.z, 1) : new GoalNear(position2.x, position2.y, position2.z, 1)
        bot.pathfinder.setGoal(goal)
        moveToPosition1 = !moveToPosition1
    }

    // Check if moveInterval is already set before creating a new one
    if (!moveInterval) {
        // Move between positions every 15 seconds
        moveInterval = setInterval(moveBetweenPositions, 15000)
    }
}

export function stopMoveToPosition() {
    if (moveInterval) {
        position1 = null;
        position2 = null;
        clearInterval(moveInterval);
        moveInterval = null;
    }
}