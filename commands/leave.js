const { useQueue } = require("discord-player")
const embeds = require('./../util/embeds');

module.exports = {
    data: {
        name: 'leave',
        description: 'Desconectar o bot e excluir a fila de músicas atual'
    },
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId)

        const embed = embeds.embedError(interaction, 'A mimir...', 'Digite /play para escolher uma música', 'https://i.ibb.co/wwN4qX4/patrick-meme-p4.png', 'https://i.ibb.co/0B64HND/leave.png')

        if (!queue) {
            return interaction.reply({ embeds: [embed] });
        }

        queue.delete()
        // const embed = embeds.embedNotification(interaction, 'Bem amigos... Terminou.', 'Para me chamar novamente, digite /play e escolha uma música!', 'https://i.ibb.co/0B64HND/leave.png')
        return interaction.reply({ embeds: [embed] });
    }
}
