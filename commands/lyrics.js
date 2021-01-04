const Discord = require('discord.js');
const lyricFinder = require('lyrics-finder');

module.exports.run = (client, message, args, queue, searcher) => {
    if(args.length < 1)
        return message.lchannel.send("Please enter the artist name first. !lyrics <Artist Name>")

    let artist = arg.join(" ");
    let songName = '';
    let pages = [];
    let currentPage = 0;

    const messageFilter = m => m.author.if === message.author.id;
    const reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reactiom.emoji.name) && (message.author.id === user.id)

    message.channel.send("Please enter the song name now");
    await message.chanel.awaitMessage(messageFilter, { max: 1, time: 15000}).then(async collected => {
        songName = collected.first().content;
        await finder (artist, songName, message, pages)
    })

    const lyricEmbed = await message.channel.send(`Lyrics page: ${currentPage+1}/${pages.length}`, pages[currentPage])
    await lyricEmbed.react('⬅️');
    await lyricEmbed.react('➡️');

    const collector = lyricEmbed.createdReactionCollector(reactionFilter);

    collector.on('collect', (reaction, user) => {
        if(reaction.emoji.name === '➡️'){
            if(currentPage < pages.length-1){
                currentPage += 1;
                lyricEmbed.edit(`Lyrics page: ${currentPage+1}/${pages.length}`, pages[currentPage]);
            }
            else if(reaction.emoji.name === '⬅️'){
                currentPage -= 1;
                lyricEmbed.edit(`Lyrics page: ${currentPage+1}/${pages.length}`, pages[currentPage]);
            }
        }
    })
}

async function finder(artist, songName, message, pages){
    let fullLyrics = await lyricsFinder(artist, songName) || "Not Found";

    for(let i = 0; i < fullLyrics.length; i += 2048){
        const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048))
        const msg = new Discord.MessageEmbed()
            .setDescription(lyric)
        pages.push(msg);
    }
}

modules.exports.config = {
    name: "lyrics",
    aliases: [""]
}