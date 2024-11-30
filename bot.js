import { createBot } from 'mineflayer'
import { setupMoveToPosition } from './mods/move2pos.js'
import armorManager from 'mineflayer-armor-manager'
import { setupAutoEat } from './mods/autoEat.js'

const position1 = { x: 610, y: 63, z: 646 }
const position2 = { x: 610, y: 63, z: 633 }

const bot = createBot({
  host: 'hutaobich123456.aternos.me',
  username: 'bayot',
  auth: 'offline'
})

bot.loadPlugin(armorManager)

bot.once('spawn', async () => {
  setupAutoEat(bot)
  setupMoveToPosition(bot, position1, position2)
})