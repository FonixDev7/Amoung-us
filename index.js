const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.once('ready', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!amoungus') {
        const embed = new EmbedBuilder()
            .setTitle('🔊 Deafen Control Tools')
            .setDescription('🎯 Use the buttons below to **deafen** or **undeafen** all members in your voice channel.')
            .setImage('https://images-ext-1.discordapp.net/external/PeP6q9yjcEG_BoCRgrlceR9gZybX4IKFWr6wLl3hE70/https/images-ext-1.discordapp.net/external/6Rv422iA9SHXRE5l3NJUe5zBUdmh-lV7cs2MhECDbHg/https/images-ext-1.discordapp.net/external/-GER7TMu_XjYFzNjIpicSlbRsp36Cp9NcrJapkNOIVk/https/images-ext-1.discordapp.net/external/6ThB8E1UNP5uz8hl09cnHtZRwYRnl9qH36Zhp5SObEo/%2525253Fformat%2525253Dwebp/https/images-ext-1.discordapp.net/external/dtWa0SbDkgd1uHC9gHl_IXFg9KvITPF79Gm_NCUk3C8/https/staticg.sportskeeda.com/editor/2020/11/d7db5-16067137204715-800.jpg?format=webp')
            .setColor('Purple')
            .setFooter({ text: '👾 Dev by Fonix' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('deafen_all')
                    .setLabel('Deafen All')
                    .setEmoji('🔇')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('undeafen_all')
                    .setLabel('Undeafen All')
                    .setEmoji('🔊')
                    .setStyle(ButtonStyle.Success),
            );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply({ content: '⚠️ **You need to be in a voice channel to use this command.**', ephemeral: true });
    }

    const members = voiceChannel.members;

    if (interaction.customId === 'deafen_all') {
        members.forEach((member) => {
            if (!member.voice.serverDeaf) {
                member.voice.setDeaf(true).catch(console.error);
            }
        });
        await interaction.reply({ content: '🔇 **All members in the voice channel have been deafened.**', ephemeral: true });
    }

    if (interaction.customId === 'undeafen_all') {
        members.forEach((member) => {
            if (member.voice.serverDeaf) {
                member.voice.setDeaf(false).catch(console.error);
            }
        });
        await interaction.reply({ content: '🔊 **All members in the voice channel have been undeafened.**', ephemeral: true });
    }
});

client.login('BOT_TOKEN');
