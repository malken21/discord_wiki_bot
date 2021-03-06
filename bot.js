const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const Config = require("./Config.json")
const wikijs = require("wikijs").default;
client.login(Config.TOKEN);
client.on('ready', () => {
  console.log(`login!!(${client.user.tag})`);
});
client.on('messageCreate', message => {
	if (message.content.startsWith(`${Config.Command} `) && !message.author.bot) {
		const wiki = wikijs({ apiUrl: Config.Wiki_URL });
		wiki.search(message.content.split(`${Config.Command} `)[1]).then(data => {
			wiki.page(data.results[0]).then(page => page.summary()).then(page => {
				wiki.page(data.results[0]).then(page => page.url()).then(page => {
					wiki.page(data.results[0]).then(page => page.pageImage()).then(page => {
						wiki.page(data.results[0]).then(page => page.content()).then(page => {
							const content = page;
							let test = "";
							if(content[0]){
								test = `\n===${content[0].title}===\n${content[0].content}`
								for(let loop = 0;content[loop].items;loop++){
									console.log(loop);
									test = `\n===${content[loop+1].title}===\n${content[loop+1].content}`
								}
							}
							console.log(test);
							const Wiki_MessageEmbed = new MessageEmbed()
							.setColor('686974')
							.setTitle(data.results[0])
							.setThumbnail(pageImage)
							.setDescription(`${summary}\n${test}`)
							message.reply({ embeds: [Wiki_MessageEmbed], components: [new MessageActionRow().addComponents(new MessageButton().setURL(url).setLabel(`wikipedia URL`).setStyle(`LINK`))], allowedMentions: { repliedUser: false }});
						});
						const pageImage = page;
						console.log(pageImage);
					});
					const url = decodeURI(page);
					console.log(url);
				});
				const summary = page;
				console.log(summary);
			});
		});
		message.channel.sendTyping();
	}
});
