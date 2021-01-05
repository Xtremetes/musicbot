module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    
    let msg = new Discord.MessageEmbed()
        .setTitle("Commands")
        .addField("Music")
        .addDescription("```!play``` Plays a song \n```!pause``` Pause the playlist \n```!resume``` Resume the playlist \n```!skip``` Skips the current song \n```!stop``` Stops the playlist entirely \n```loopall``` Loops all the songs in the playlist \n```loopone``` Loops the current song \n```loopoff``` Stops the loop \n```!queue``` Shows the queue")
        .addField("Status")
        .addDescription("```!ping``` Shows the ping of the bot")
        .setColor("ORANGE")
    return message.channel.send(msg);
}

module.exports.config = {
    name: "help",
    aliases: [""]
}