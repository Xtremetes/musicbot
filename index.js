const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const { measureMemory } = require('vm');
const ytdl = require("ytdl-core");
const fs = require('fs')

const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: process.env.youtube_api,
    revealed: true
})

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (e, f) => {
    if(e) return console.error(e);
    f.forEach(file => {
        if(!file.endsWith(".js")) return
        console.log(`${file} has been loaded`)
        let cmd = require(`./commands/${file}`);
        let cmdName = cmd.config.name;
        client.commands.set(cmdName, cmd)
        cmd.config.aliases.forEach(alias => {
            client.aliases.set(alias, cmdName);
        })
    })
})

const queue = new Map();

client.on('ready', () => {
    console.log('This bot is online!');
})

client.on("message", async(message) => {
    const prefix = '!';

    if(!message.content.startsWith(prefix)) return

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if(!cmd) return;

    try{
        cmd.run(client, message, args, queue, searcher);
    }
    catch(err){
        return console.error(err)
    }
})

client.on('message', async message => {
    if(message.content == "!help"){
        const msg = new Discord.MessageEmbed()
            .setTitle("Commands")
            .addField("Music")
            .addDescription("```!play``` Plays a song \n```!pause``` Pause the playlist \n```!resume``` Resume the playlist \n```!skip``` Skips the current song \n```!stop``` Stops the playlist entirely \n```loopall``` Loops all the songs in the playlist \n```loopone``` Loops the current song \n```loopoff``` Stops the loop \n```!queue``` Shows the queue")
            .addField("Status")
            .addDescription("```!ping``` Shows the ping of the bot")
            .setColor("ORANGE")
        return message.channel.send(msg);
    }
})

client.login(process.env.token);