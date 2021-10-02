
const { Client, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const Config = require("./Config.json")
const wikijs = require("wikijs").default;
client.login(Config.TOKEN);
client.on('ready', () => {
  const time = new Date()
  console.log(`${time}\nlogin!!(${client.user.tag})`);
});
client.on('messageCreate', message => {
	if (message.content.startsWith(`${Config.Command} `) && !message.author.bot) {
		message.channel.sendTyping()
		let wiki = wikijs({ apiUrl: Config.Wiki_URL });
		wiki.search(message.content.split(' ')[1]).then(data => {
			wiki.page(data.results[0])
			.then(page => page.summary())
			.then(page => {message.reply({ content: page, allowedMentions: { repliedUser: false }})});
		});
	}
});