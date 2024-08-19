const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")
const { useMainPlayer, Player } = require("discord-player")
const { YoutubeiExtractor } = require("discord-player-youtubei")
const embeds = require('./../util/embeds');


module.exports = {

    data: {
        name: 'play',
        description: 'Execute uma música!',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'search',
                description: 'Coloque a URL do música do Youtube',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ],
    },
    execute: async ({ client, interaction }) => {
        const player = useMainPlayer()
        //player.extractors.register(YoutubeiExtractor, {}) //Added, because YoutubeExtrators dont work more. RIP

        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Não te encontrei em nenhum canal de voz! Entre em um para ouvir o que tenho pra tocar 😏\n(Lá ele)')
            return
        }

        const query = interaction.options.getString('search', true)
        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction,
                    noEmitInsert: true,
                    leaveOnStop: false,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 60000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 60000,
                    pauseOnEmpty: true,
                    preferBridgedMetadata: true,
                    disableBiquad: true,
                },
                requestedBy: interaction.user,
                connectionOptions: {
                    deaf: true,
                },
                seek: 60000,
            });

            embedQueue = embeds.embedNotification(interaction, `[${track.title}] adicionada a fila!`, 'Veja como foi a criação do P4 Bot no youtube: @P4Code', 'https://i.ibb.co/nwJCcyF/playlist.png')
            await interaction.followUp({ embeds: [embedQueue] });
        } catch (err) {
            await interaction.followUp(`Something went wrong: ${err}`);
        }
    }

}