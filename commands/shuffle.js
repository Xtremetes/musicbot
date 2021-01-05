const Discord = require("discord.js");

module.exports.run = async(client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue)
        return message.channel.send("There is no music currently playing!");
    if(message.member.voice.channel != message.guild.me.voice.channel)
        return message.channel.send("You are not in the voice channel!")

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.shuffle();
    message.channel.send("The queue has been shuffled")
}

module.exports.config = {
    name: "shuffle",
    aliases: [""]
}