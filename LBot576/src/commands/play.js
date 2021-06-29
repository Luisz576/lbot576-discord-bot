const search = require('yt-search')
const ytdl = require('ytdl-core-discord')

function execute(bot, msg, args){
    const searchQuery = args.join(' ')
    if(searchQuery)
        try{
            search(searchQuery, async (err, data)=>{
                if(err) throw err
                if(data && data.videos.length > 0){
                    const song = data.videos[0]
                    let queue = bot.mQueues.get(msg.member.guild.id)
                    if(queue){
                        queue.songs.push(song)
                        bot.mQueues.set(msg.member.guild.id, queue)
                        return msg.reply(`Vídeo adicionado a lista de reproduções:\n${song.url}`)
                    }else return playSong(bot,msg,song)
                }else return msg.reply("Não encontrei nada :(")
            })
        }catch(e){
            console.log(e)
        }
    else return msg.reply("Informe algum vídeo!")
}

const playSong = async (bot, msg, song)=>{
    let queue = bot.mQueues.get(msg.member.guild.id)
    if(!song){
        queue.connection.disconnect()
        bot.mQueues.delete(msg.member.guild.id)
    }
    if(!msg.member.voice.channel) return msg.reply("Você deve estar conectado a um canal de voz para executar este comando!")
    if(!queue){
        const conn = await msg.member.voice.channel.join()
        queue = {
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song]
        }
    }
    queue.dispatcher = await queue.connection.play(await ytdl(song.url, { highWaterMark: 1<< 25, filter: 'audioonly'}), {
        type: "opus",
    })
    queue.dispatcher.on('finish', ()=>{
        queue.songs.shift()
        playSong(bot, msg, queue.songs[0])
    })
    bot.mQueues.set(msg.member.guild.id, queue)
    return msg.reply(`Tocando agora:\n${song.url}`)
}

module.exports = {
    name: "p",
    help: "Toco audio de algum vídeo do youtube no canal que você estiver conectado",
    execute,
    playSong,
}