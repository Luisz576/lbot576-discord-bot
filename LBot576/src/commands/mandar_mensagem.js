function execute(_bot, msg, args){
    const messageContent = args.join(' ')
    msg.author.send(messageContent)
    msg.reply("Mensagem enviada!")
}

module.exports = {
    name: 'sm',
    help: "Eu te mando a mensagem que você quiser",
    execute
}