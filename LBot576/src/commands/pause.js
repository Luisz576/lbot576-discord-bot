function execute(bot, msg, _args){
    let queue = bot.mQueues.get(msg.guild.id)
    if(!queue) return msg.reply("Não estou conectado em nenhum canal deste servidor :(")
    queue.dispatcher.pause()
    return msg.reply("Pausa")
}

module.exports = {
    name: "pp",
    help: "Pausa o audio que estiver tocando no seu canal",
    execute,
}