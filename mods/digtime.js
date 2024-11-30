export function diggingTime(bot) {
    const block = bot.blockAtCursor(3)
    if (block) {
        const digTime = bot.digTime(block)
        return digTime;
    }
}