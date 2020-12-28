module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if(!serverQueue)
        return message.channel.send("There is no music currently playing!");
    if(message.member.voice.channel != message.guild.me.voice.channel)
        return message.channel.send("You are not in the voice channel");

    let nowPlaying = serverQueue.songs[0];
    let qMsg = `Now playing: ${nowPlaying.title} (${("00" + Math.floor(serverQueue.songs[0].duration / 60)).slice(-2)}:${("00" + Math.floor(serverQueue.songs[0].duration % 60)).slice(-2)})\n \n`;

    for(var i = 1; i < serverQueue.songs.length; i++){
        qMsg += `${i}. ${serverQueue.songs[i].title} (${("00" + Math.floor(serverQueue.songs[i].duration / 60)).slice(-2)}:${("00" + Math.floor(serverQueue.songs[i].duration % 60)).slice(-2)})\n`
    }

    message.channel.send('```' + qMsg + '```');
}

module.exports.config = {
    name: "queue",
    aliases: ["q"]
}