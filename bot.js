require('dotenv').config()

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const PING_COMMAND = 'ping'
const SUBSCRIBE_COMMAND = '/subscribe'



client.on('ready', () => {
    console.log('Our bot is ready!')
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === PING_COMMAND) {
        msg.reply('Pong!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === SUBSCRIBE_COMMAND) {
        msg.member.roles.add("879849909744988190")
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === 'los amo') {
        msg.react('💖')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team verde') {
        msg.member.roles.add("879904197254971392")
        msg.reply('Ya eres team verde!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team amarillo') {
        msg.member.roles.add("879904969568976917")
        msg.reply('Ya eres team amarillo!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team azul') {
        msg.member.roles.add("879905226268758017")
        msg.reply('Ya eres team azul!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team morado') {
        msg.member.roles.add("879905460143153213")
        msg.reply('Ya eres team morado!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team turquesa') {
        msg.member.roles.add("879905676049154138")
        msg.reply('Ya eres team turquesa!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team rosa') {
        msg.member.roles.add("879905876146806844")
        msg.reply('Ya eres team rosa!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team naranja') {
        msg.member.roles.add("879906087464235009")
        msg.reply('Ya eres team negro!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase() === '/team marron') {
        msg.member.roles.add("879908348152127519")
        msg.reply('Ya eres team marron!')
    }
})





client.login(process.env.BOT_TOKEN)

