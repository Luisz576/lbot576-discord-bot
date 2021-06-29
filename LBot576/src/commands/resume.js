function execute(bot, msg, _args){
    let queue = bot.mQueues.get(msg.guild.id)
    if(!queue) return msg.reply("Não estou conectado em nenhum canal deste servidor :(")
    queue.dispatcher.resume()
    return msg.reply("Continua")
}

module.exports = {
    name: "pr",
    help: "Continua um audio que foi pausado",
    execute,
}