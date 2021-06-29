function execute(bot, msg, args){
    let queue = bot.mQueues.get(msg.guild.id)
    if(!queue) return msg.reply("Não estou conectado em nenhum canal deste servidor :(")
    const volume = Number(args[0])
    if(isNaN(volume) || volume < 0 || volume > 10) return msg.reply("O volume deve ser um valor entre 0 e 10")
    queue.dispatcher.setVolume(volume/10)
    queue.volume = volume
    bot.mQueues.set(msg.guild.id, queue)
    return msg.reply(`Volume setado para ${volume}`)
}

module.exports = {
    name: "pv",
    help: "Ajusta o volume numa escala de 0 a 10",
    execute,
}