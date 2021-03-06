// Load up the discord.js library
const Discord = require("discord.js");
const { monitorEventLoopDelay } = require("perf_hooks");
// const { config } = require("process");

/*
 DISCORD.JS VERSION 11 CODE
*/

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
// const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// sike we do it with env variables 
const config = {
  "token": process.env.TOKEN,
  "hushChannelId" : process.env.HUSH,
  "talkChannelId" : process.env.TALK,
  "prefix" : "//"
}


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Shutting you up`);


  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if (!message.content.startsWith(config.prefix)) return;

  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.  
  if (command === "stfu") {
    client.channels.fetch(config.talkChannelId).then((response) => {
      for (const [memberID, member] of response.members) {
        client.channels.fetch(config.hushChannelId).then((hush) => {
          member.edit({ channel: hush })
        })
      }
    })
      .catch((err) => {
        console.log(err)
      });
  }

  if (command === "unstfu") {
    client.channels.fetch(config.hushChannelId).then((response) => {
      for (const [memberID, member] of response.members) {
        client.channels.fetch(config.talkChannelId).then((hush) => {
          member.edit({ channel: hush })
        })
      }
    })
      .catch((err) => {
        console.log(err)
      });
  }
});

client.login(config.token);