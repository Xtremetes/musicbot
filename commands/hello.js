module.exports.run = (message) => {
    message.channel.send("Hello!");
}

module.exports.config = {
    name: "hello",
    aliases: ["hi", "hey", "yo"]
}