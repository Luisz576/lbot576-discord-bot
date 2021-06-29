function execute(bot, msg, _args){
    let msgHelp = "**===== HELP =====**"
    bot.commands.forEach(command => {
        if(command.help && command.name)
            msgHelp += `\n**${command.name}**: ${command.help}`
    });
    msgHelp += "\n== Desenvolvido por **Luisz576** =="
    return msg.channel.send(msgHelp)
}

module.exports = {
    name: "help",
    help: "Mostra todos os comandos que eu tenho",
    execute,
}