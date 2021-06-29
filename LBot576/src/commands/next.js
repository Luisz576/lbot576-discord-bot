const playSong = require('./play').playSong

function execute(bot, msg, _args){
    const queue = bot.mQueues.get(msg.guild.id)
    if(!queue) return msg.reply("Não estou conectado em nenhum canal deste servidor :(")
    queue.songs.shift()
    bot.mQueues.set(msg.guild.id, queue)
    playSong(bot, msg, queue.songs[0])
    return msg.reply("Pula")
}

module.exports = {
    name: "pn",
    help: "Pula para a próxima música!",
    execute,
}