const { useTimeline } = require("discord-player");
const embed = require("../util/embeds")

module.exports = {
    data: {
        name: 'resume',
        description: 'Despause o que ta pausado!'
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

        if (!timeline.paused) {
            await interaction.reply('A track atual já está TOCANDO!\nUse /pause para PAUSAR')
            return
        }

        timeline.resume()

        await interaction.reply({ embeds: [embed.embedNotification(interaction, `[${timeline.track.description}] - RETOMADO!`, '/queue para ver a fila', 'https://i.ibb.co/ygpQWXn/update.png', 'Blue')] })
    }
}