const { useTimeline, useQueue } = require('discord-player');
const embed = require('../util/embeds')

module.exports = {
    data: {
        name: 'skip',
        description: 'Proxima música',
    },
    execute: async ({ client, interaction }, thereIsReply = false) => {
        const queue = useQueue(interaction.guildId)
        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Não te encontrei em nenhum canal de voz! Entre em um para ouvir o que tenho pra tocar 😏\n(Lá ele)')
            return
        }

        queue.node.skip()
        embedSkip = embed.embedNotification(interaction, `A música [${queue.currentTrack.description}] estava com pressa - PRÓXIMA!`, '/resume caso tenha skipado a musica pausada', 'https://i.ibb.co/nD1b3fd/next.png', 'Blue')

        if (!thereIsReply) {
            await interaction.reply({ embeds: [embedSkip] })
        } else {
            await interaction.followUp({ embeds: [embedSkip] })
        }
    }
}