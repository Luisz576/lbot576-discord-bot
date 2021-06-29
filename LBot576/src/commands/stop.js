function execute(bot, msg, _args){
    let queue = bot.mQueues.get(msg.guild.id)
    if(!queue) return msg.reply("Não estou conectado em nenhum canal deste servidor :(")
    queue.connection.disconnect()
    bot.mQueues.delete(guildId)
    return msg.reply("Stoped!")
}

module.exports = {
    name: "ps",
    help: "Para de tocar e desconecta",
    execute,
}