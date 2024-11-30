import { loader as autoEat } from 'mineflayer-auto-eat'

export function setupAutoEat(bot) {
  bot.loadPlugin(autoEat)

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
}