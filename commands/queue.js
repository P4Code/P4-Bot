const { ButtonStyle } = require('discord-api-types/v10')
const { useQueue } = require('discord-player')
const { ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')


module.exports = {
    data: {
        name: 'queue',
        description: 'Veja as músicas que estão na fila!',
        category: 'music',
        options: [
            {
                name: 'pagina',
                description: 'Número da página da fila',
                type: ApplicationCommandOptionType.Number,
                required: false,
            }
        ]
    },
    execute: async ({ client, interaction }) => {

        const queue = useQueue(interaction.guildId)

        const prevButton = new ButtonBuilder()
            .setCustomId('down_arrow')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔼')

        const nextButton = new ButtonBuilder()
            .setCustomId('up_arrow')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔽')

        const skipMusic = new ButtonBuilder()
            .setCustomId('skip_music')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⏭')

        async function getQueuesPage(page, update = false) {

            if (!queue.size) {
                await interaction.reply('A fila está vazia, dê /play para adicionar musicas na fila')
            }

            const multiple = 10
            const maxPages = Math.ceil(queue.size / multiple);

            if (page < 1 || page > maxPages) {
                page = 1
            }

            const end = page * multiple;
            const start = end - multiple;

            const tracks = queue.tracks.toArray().slice(start, end)

            const row = new ActionRowBuilder()
                .addComponents(prevButton, nextButton, skipMusic);

            const embed = new EmbedBuilder()
                .setDescription(
                    `${tracks
                        .map(
                            (track, i) =>
                                `${start + ++i} • [${track.title}](${track.url}) • [${track.requestedBy.toString()}]`
                        )
                        .join("\n")}`)
                .setFooter({
                    text: `Pagina ${page} de ${maxPages}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                })
                .setColor('Blue')
                .setTimestamp()

            let response = null

            if (!update) {
                response = await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true
                })
            } else {
                response = await interaction.editReply({
                    embeds: [embed],
                });
            }

            const collectorFilter = i => i.user.id === interaction.user.id;
            try {
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                if (confirmation.customId === 'down_arrow') {
                    await confirmation.update({ content: '' });
                    getQueuesPage(page - 1 ?? 1, true)
                } else if (confirmation.customId === 'up_arrow') {
                    await confirmation.update({ content: '' });
                    getQueuesPage(page + 1, true)
                } else if (confirmation.customId === 'skip_music') {
                    const skipCommand = client.commands.get('skip')
                    skipCommand.execute({ client, interaction }, true)
                    await confirmation.update({ content: '' })
                    getQueuesPage(page, true)
                }
            } catch (e) {
                console.log(e);
                await interaction.editReply({ content: '', components: [] });
            }

        }

        getQueuesPage(interaction.options.getNumber('pagina', false) ?? 1)


    }
}
