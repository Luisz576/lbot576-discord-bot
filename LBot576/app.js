const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const {
    token,
    commandPrefix
} = require('./src/json/configs.json')
const bot = new Discord.Client()

bot.commands = new Discord.Collection()
bot.mQueues = new Map()

const commandsFiles = fs.readdirSync(path.join(__dirname, "/src/commands")).filter(filename=>filename.endsWith('.js'))
for(let filename of commandsFiles){
    const command = require(`./src/commands/${filename}`)
    bot.commands.set(command.name, command)
}

bot.login(token)

bot.on('ready', ()=>{
    console.log("Logado!")
})

bot.on('message', (msg)=>{
    if(!msg.content.startsWith(commandPrefix) || msg.author.bot) return
    const args = msg.content.slice(commandPrefix.length).split(' ')
    const command = args.shift()
    try{
        bot.commands.get(command).execute(bot, msg, args)
    }catch(e){
        msg.reply("Ops! Eu não conheço esse comando :(")
    }
})