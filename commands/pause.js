const { useTimeline } = require("discord-player")
const embeds = require('../util/embeds');

module.exports = {
    data: {
        name: 'pause',
        description: 'Pause a música atual!',
    },
    execute: async ({ client, interaction }) => {

        const timeline = useTimeline(interaction.guildId)
        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Não te encontrei em nenhum canal de voz! Entre em um para ouvir o que tenho pra tocar 😏\n(Lá ele)')
            return
        }

        if (!timeline?.track) {
            await interaction.reply('Nenhuma track está tocando no momento!')
            return
        }

        if (timeline.paused) {
            await interaction.reply('A track atual já está pausada!\nUse /resume para despausar')
            return
        }

        timeline.pause()
        await interaction.reply({ embeds: [embeds.embedNotification(interaction, `[${timeline.track.description}] - PAUSADA!`, '/resume para despausar', 'https://i.ibb.co/zxbVLqG/pause.png')] })
    }
}