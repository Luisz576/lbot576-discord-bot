const MessageEmbed = require('discord.js').MessageEmbed
const random = require('../utils/functions').random

function execute(_bot, msg, args){
    const messageContent = args.join(' ')
    const messageEmbed = new MessageEmbed().setTitle(`${msg.author.username}:`).setColor([random(255), random(255), random(255)]).setDescription(messageContent)
    msg.channel.send(messageEmbed)
    msg.delete()
}

module.exports = {
    name: "m",
    help: "Cria uma mensagem Embed",
    execute
}