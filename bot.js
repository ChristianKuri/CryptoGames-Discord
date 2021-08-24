require('dotenv').config()

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const PING_COMMAND = 'ping'
const SUBSCRIBE_COMMAND = '/subscribe'

client.on('ready', () => {
    console.log('Our bot is ready!')
})

client.on('messageCreate', msg => {
    if (msg.content === PING_COMMAND) {
        msg.reply('Pong!')
    }
})

client.on('messageCreate', msg => {
    if (msg.content === SUBSCRIBE_COMMAND) {
        msg.member.roles.add("879849909744988190")
    }
})

client.on('messageCreate', msg => {
    if (msg.content === 'los amo') {
        msg.react('💖')
    }
})

client.login(process.env.BOT_TOKEN)