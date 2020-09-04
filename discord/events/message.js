const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = async message => {
  var notLowerCaseKenobi = message.content
  var lowerCaseKenobi = notLowerCaseKenobi.toLowerCase
  if (lowerCaseKenobi.includes("hello there")) {
    let embed = new Discord.MessageEmbed()
    .attachFiles("https://media.giphy.com/media/8JTFsZmnTR1Rs1JFVP/giphy.gif")
    message.channel.send(embed);
    return;
  }
}
