const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
  const guildNames = client.guilds.map(g => g.name).join("\n");
    if(args.join(" ") == '') {
    const embed = {
  "description": guildNames,
  "color": config.neoney_color,
  "author": {
    "name": "Guilds with me on them"
  },
   "fields": [
  {
       "name": "To get invitation link",
       "value": "Use `guilds <guildnumber>`"
 } 
     
]
};
message.channel.send({ embed });
    } else {
     
      var numer = Number(args[0])
      if(!Number.isInteger(numer)) return message.reply('Not a number.');
      if(numer > client.guilds.size) return message.reply('Too big.');
      if(numer < 1) return message.reply('How would you use it?');
      client.guilds.array()[numer - 1].channels.filter(channel => channel.type !== 'category').first().createInvite()
        .then(invite => { 
      let embed = new Discord.RichEmbed()
      .setTitle("Invitation Link")
      .addField("Guild",client.guilds.array()[numer - 1])
      .addField("Link", "https://discord.gg/" + invite.code )
      .setColor(config.embed_color)
      .setFooter("Invitation Link")
      message.author.send({embed})
       message.channel.send('Check dm!')
      .then(message => message.delete(5000))})
        .catch(err => message.reply(err.message));
    }
}
module.exports.help = {
  name: "guilds",
  category: "info"
}
