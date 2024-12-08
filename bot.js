import { createBot } from 'mineflayer'
import { setupMoveToPosition } from './mods/move2pos.js'
import armorManager from 'mineflayer-armor-manager'
import { setupAutoEat } from './mods/autoEat.js'
import pkg from './mods/hawkeye.cjs'
const { autoBow } = pkg
import { followPlayer } from './mods/followPlayer.js'

import inventoryViewer from 'mineflayer-web-inventory'
import config from './config.json' assert { type: 'json' };

const position1 = config.position1
const position2 = config.position2

const bot = createBot(config.bot);

inventoryViewer(bot)
bot.loadPlugin(armorManager)

bot.once('spawn', async () => {
  setupAutoEat(bot)
  // setupMoveToPosition(bot, position1, position2)
})

let lastHealthMessage = 0
let playerFollowing = false
let followTarget = null

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  if (message === 'follow' || message === 'f') {
    const playerEntity = bot.players['Dainsleif']?.entity
    if (playerEntity) {
      bot.chat('ok!')
      playerFollowing = true
      followTarget = playerEntity
    } else {
      bot.chat('I can’t see you!')
    }
  }

  if (message === 'stop' && playerFollowing) {
    bot.chat('Stopping follow.')
    playerFollowing = false
    followTarget = null
    setupMoveToPosition(bot, position1, position2)
  }


  if (message === 'fight me') {
    autoBow(bot, bot.players[username].entity);
  }
})
let lastFollowTime = 0;
const followInterval = 1000; // 1 second

// bot.on("playerCollect", (collector, collected) => {
//   if (collector !== bot.entity) return
//   setTimeout(() => {
//     const food = bot.inventory.items().find(item => item.name.includes('bread'))
//     if (food) {
//       bot.chat('I got some bread!')
//     }
//   }, 150)
// })

bot.on('physicsTick', () => { 
  if (playerFollowing && followTarget) {
    const now = Date.now();
    if (now - lastFollowTime > followInterval) {
      followPlayer(bot, followTarget.position);
      lastFollowTime = now;
    }
  }

  //* Prevent spam by only sending message every 3 seconds
  if ((bot.health >= 18 || bot.health <= 15) && Date.now() - lastHealthMessage > 1000) {
    autoBow(bot)
    lastHealthMessage = Date.now()
  }
})