require('dotenv').config();

const { Client, Intents, Util } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const FB = require('fb');

client.db = require('quick.db');
client.request = new (require('rss-parser'))();
const config = require('./config.js');

const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/** My Commands */
const PING_COMMAND = 'ping';

client.on('ready', () => {
    console.log('Our bot is ready!');
    youtube();
});

client.on('messageCreate', (msg) => {
    if (msg.content.toLowerCase() === PING_COMMAND) {
        msg.reply('Pong!');
    }
});

client.on('messageCreate', (msg) => {
    if (
        msg.content.toLowerCase().includes('beca') &&
        !msg.member.roles.cache.some((role) => role.name === 'Dueño') &&
        !msg.member.roles.cache.some((role) => role.name === 'Moderador') &&
        !msg.member.roles.cache.some((role) => role.name === 'Pre Moderador')
    ) {
        let channel = msg.guild.channels.cache.get('878651279155548230').toString();
        msg.reply(`Ve a ${channel} ahi puedes leer la informacion`);
    }
});

client.on('messageCreate', (msg) => {
    if (msg.channelId == '873246262080712764') {
        if (!msg.member.roles.cache.some((role) => role.name === 'Suscriptor')) {
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

/** Youtube Commands */

function youtube() {
    if (client.db.fetch(`postedVideos`) === null) {
        client.db.set(`postedVideos`, []);
    }

    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${config.channel_id}`).then((data) => {
            if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                // Publish On discord
                client.db.set(`videoData`, data.items[0]);
                client.db.push('postedVideos', data.items[0].link);
                let parsed = client.db.fetch(`videoData`);
                let channel = client.channels.cache.get(config.channel);
                if (!channel) return;
                let message = config.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);

                channel.send(message);

                // Publish on facebook
                let facebookMessage = config.messageTemplate
                    .replace('@everyone, ', '')
                    .replace(/{title}/g, Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link)
                    .replaceAll('*', '');

                FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
                FB.api(`/${config.facebook.page_id}/feed`, 'POST', { message: facebookMessage, link: parsed.link }, function (response) {
                    if (response.error) {
                        console.log('error occurred: ' + response.error);
                        return;
                    }
                });

                // Publish on Twitter
                let twitterMessage = config.messageTemplate
                    .replace('@everyone, ', '')
                    .replace(/{title}/g, Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link)
                    .replaceAll('*', '');

                twitterClient.tweets
                    .statusesUpdate({
                        status: twitterMessage,
                    })
                    .then((response) => {
                        console.log('Tweeted!', response);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }, config.watchInterval);
}

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
