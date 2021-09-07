require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const PING_COMMAND = 'ping';

client.on('ready', () => {
    console.log('Our bot is ready!');
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === PING_COMMAND) {
        msg.reply('Pong!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.channelId == '873246262080712764') {
        if (msg.member.roles.cache.some((role) => role.name === 'Suscriptor')) {
            msg.author.send({
                content: `**Borramos tu mensaje del Canal 📚・becas・scholarships** 
                Para ser considerado para una beca tienes que estar minimo con el rol de Suscriptor, para obtener tu rol tienes que hacer lo siguiente:
                Seguimiento de las redes sociales:
                Facebook: <https://fb.me/CryptoGamesMX>
                Youtube:  <https://www.youtube.com/c/CryptoGamesMX> (subscribirse y comentar un video)
                Twitter: <https://twitter.com/CryptoGamesMX>
                Twitch: <https://www.twitch.tv/cryptogamesmx>
                Para verificar que cumplieron con los requisitos necesito que mandes captura a cualquiera de los @Moderador o @Pre Moderador del Servidor
                `,
            });
            msg.delete();
        }
    }
});

client.login(process.env.BOT_TOKEN);

/* client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/suscribe') {
        msg.member.roles.add('879849909744988190');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === 'los amo') {
        msg.react('💖');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team verde') {
        msg.member.roles.add('879904197254971392');
        msg.reply('Ya eres team verde!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team amarillo') {
        msg.member.roles.add('879904969568976917');
        msg.reply('Ya eres team amarillo!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team azul') {
        msg.member.roles.add('879905226268758017');
        msg.reply('Ya eres team azul!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team morado') {
        msg.member.roles.add('879905460143153213');
        msg.reply('Ya eres team morado!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team turquesa') {
        msg.member.roles.add('879905676049154138');
        msg.reply('Ya eres team turquesa!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team rosa') {
        msg.member.roles.add('879905876146806844');
        msg.reply('Ya eres team rosa!');
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === '/team marron') {
        msg.member.roles.add('879908348152127519');
        msg.reply('Ya eres team marron!');
    }
}); */
