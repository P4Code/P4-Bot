require('dotenv').config()
// Client, EmbedBuilder, GatewayIntentBits
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Events, GuildMember } = require('discord.js')
const { Player, Track, useTimeline, useQueue } = require('discord-player')
const { YoutubeiExtractor, generateOauthTokens } = require("discord-player-youtubei")
const embeds = require('./util/embeds');

const fs = require('fs')
const path = require('path')
const { getDefaultHighWaterMark } = require('stream')
const { error } = require('console')
const { channel } = require('diagnostics_channel')

//Intençoes (Permissões) do bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    autoReconnect: true,
})

// Comandos
const lstCommands = []
client.commands = new Collection();

const pathCommandsDir = path.join(__dirname, 'commands')
const files = fs.readdirSync(pathCommandsDir).filter(file => file.endsWith('.js'))

for (const file of files) {
    const filePath = path.join(pathCommandsDir, file)
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    lstCommands.push(command.data)
}

const oauthTokens = process.env.YTB_OAUTH

client.player = new Player(client, {})
client.player.extractors.loadDefault();
client.player.extractors.register(YoutubeiExtractor, { authentication: oauthTokens }) //Added, because YoutubeExtrators dont work more. RIP

client.player.events.on('playerStart', (queue, track) => {
    const embedTrack = embeds.embedConfirmation(client.interaction, `Tocando agora: [${track.title}]`, `${track.url}`, track.thumbnail)
    if (client.error) {
        const timeline = useTimeline(client.interaction.guildId)
        console.log(timeline.timestamp.current.value);
        console.log(client.TimePausedTrack);
        timeline.setPosition(client.TimePausedTrack)
        client.error = false
    }
    queue.metadata.channel.send({ embeds: [embedTrack] })
})

//Registrar os comandos
client.on('ready', () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

    try {
        console.log('Started refreshing application (/) commands.');
        rest.put(Routes.applicationCommands(process.env.APP_ID), { body: lstCommands })
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.log(error);
    }

    // for (const gID of guild_ids) {
    //     rest.put(Routes.applicationGuildCommands(process.env.APP_ID), { body: lstCommands })
    //         .then(() => console.log(`Comandos adicionados para ${gID}`))
    //         .catch(console.log(error))
    // }

    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {
        return
    }

    const commandName = client.commands.get(interaction.commandName)
    client.interaction = interaction

    if (!commandName) {
        return
    } else {
        try {
            await commandName.execute({ client, interaction })
            process.on('uncaughtException', function (err) {
                console.error(err.stack);

                if (!client.error) {
                    const timeline = useTimeline(interaction.guildId)
                    const actualQueue = useQueue(interaction.guildId)

                    let oldTracks = actualQueue.tracks.store

                    oldTracks = [timeline.track].concat(oldTracks)

                    actualQueue.clear()
                    actualQueue.addTrack(oldTracks)
                    actualQueue.node.skip()
                    client.error = true
                    client.TimePausedTrack = timeline.timestamp.current.value
                }
                // console.log(timeline.timestamp);
                //timeline.setPosition(timeline.timestamp.current.value + 1000)

            });

        } catch (err) {
            console.log(err);
            const embedError = embeds.embedError(interaction, 'Boa tarde! Deu PAU!!', 'Não consegui entender este comando!', 'https://i.ibb.co/XsCTXxg/No-Result-Found-5.png')
            await interaction.reply({ embeds: [embedError] })
        }
    }
})

client.on(Events.ShardError, error => {
    console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Erro ao conectar ao Discord:', error);
});

