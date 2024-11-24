import { createBot } from 'mineflayer'
import { loader as autoEat } from 'mineflayer-auto-eat'
import pathfinderPlugin from 'mineflayer-pathfinder'
import armorManager from 'mineflayer-armor-manager'

const { pathfinder, Movements, goals } = pathfinderPlugin
const { GoalNear } = goals

const position1 = { x: 610, y: 63, z: 646 }
const position2 = { x: 610, y: 63, z: 633 }

const bot = createBot({
  host: 'hutaobich123456.aternos.me',
  username: 'bayot',
  auth: 'offline'
})

bot.loadPlugin(autoEat)
bot.loadPlugin(pathfinder)
bot.loadPlugin(armorManager)


bot.once('spawn', async () => {
  const defaultMove = new Movements(bot)

  bot.autoEat.opts = {
    priority: "foodPoints",
    minHunger: 20,
    minHealth: 14,
    returnToLastItem: true,
    offhand: false,
    eatingTimeout: 3000,
    bannedFood: [
      "rotten_flesh",
      "pufferfish",
      "chorus_fruit",
      "poisonous_potato",
      "spider_eye",
    ],
    strictErrors: true
  }

  // Enable auto-eating
  bot.autoEat.enableAuto()

  defaultMove.canDig = false;
  defaultMove.allowSprinting = false;
  bot.pathfinder.setMovements(defaultMove)

  // Event handlers for eating actions
  bot.autoEat.on('eatStart', (opts) => {
    console.log(`Started eating ${opts.food.name} in ${opts.offhand ? 'offhand' : 'hand'}`)
  })

  bot.autoEat.on('eatFinish', (opts) => {
    console.log(`Finished eating ${opts.food.name}`)
  })

  bot.autoEat.on('eatFail', (error) => {
    console.error('Eating failed:', error)
  })

  // Function to move between positions
  let moveToPosition1 = true
  const moveBetweenPositions = () => {
    const goal = moveToPosition1 ? new GoalNear(position1.x, position1.y, position1.z, 1) : new GoalNear(position2.x, position2.y, position2.z, 1)
    bot.pathfinder.setGoal(goal)
    moveToPosition1 = !moveToPosition1
  }

  // Move between positions every 15 seconds
  setInterval(moveBetweenPositions, 15000)
})