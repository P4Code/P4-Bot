const { EmbedBuilder } = require('discord.js');

const embedWarning = (interaction, titleText, color = 'DarkGold') => {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(titleText)
        .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTimestamp()

    return embed
}

const embedConfirmation = (interaction, titleText, desc, thumbnail, color = 'Green') => {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: 'P4 CODE', iconURL: 'https://i.ibb.co/TYswf5J/1.png', url: 'https://www.youtube.com/channel/UC8QJAzQ1OkaJP-Xy-8KbAAA?sub_confirmation=1' })
        .setTitle(titleText)
        .setDescription(desc)
        .setThumbnail(thumbnail)
        .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTimestamp()

    return embed
}

const embedError = (interaction, title, desc, img, thumb=null, color = 'Red') => {
    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setAuthor({ name: 'P4 CODE', iconURL: 'https://i.ibb.co/TYswf5J/1.png', url: 'https://www.youtube.com/channel/UC8QJAzQ1OkaJP-Xy-8KbAAA?sub_confirmation=1' })
        .setDescription(desc)
        .setImage(img)
        .setThumbnail(thumb)
        .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTimestamp()

    return embed
}

const embedNotification = (interaction, title, desc, img, color = 'Blue') => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'P4 CODE', iconURL: 'https://i.ibb.co/TYswf5J/1.png', url: 'https://www.youtube.com/channel/UC8QJAzQ1OkaJP-Xy-8KbAAA?sub_confirmation=1' })
        .setColor(color)
        .setTitle(title)
        .setDescription(desc)
        .setThumbnail(img)
        .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setTimestamp()

    return embed
}

module.exports = {
    embedWarning,
    embedConfirmation,
    embedError,
    embedNotification
}