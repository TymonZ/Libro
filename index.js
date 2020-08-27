const { randomImage } = require("./js/lib/randomImage");

const { getServerID } = require(`./js/lib/getServerID`);

const { getChannelID } = require(`./js/lib/getChannelID`);

const { collectFromChannel } = require("./js/lib/collectFromChannel");

const { createLibrary } = require("./js/lib/createLibrary");

const { updateChannelList } = require("./js/lib/updateChannelList");

const { imageSaver } = require("./js/lib/imageSaver");

const { prefix, token } = require('./config.json');

const Discord = require(`discord.js`);

const client = new Discord.Client();

client.once('ready', () => {
	console.log("Ready")
	client.user.setActivity(':: help');

	//update every channel name
	for (let i = 0; i < guild.channels.cache.array().length; i++) {
		let chan = arr[i];
		if(chan.type == 'text') {
			updateChannelList(chan);
		}
	}
})

client.login(token);

client.on('channelUpdate', (channel) => {
	console.log(channel.name);
	updateChannelList(channel);
});

client.on('message', message => {

	// HELP
	{
		if(message.content == `${prefix} help` || message.content == `${prefix} h`) {
		message.channel.send(
			'**HELP:**\n`:: help`/`:: h` - list of commands\n`:: server id` - basic server info\n`:: channel id` - basic channel info\n \n**DO AFTER INVITING BOT:**\n`:: server init` - creates server library\n`:: channel collect` - adds channel to list of channels that bot is getting images from\n \n**OTHER COMMANDS:**\n`:: skip`/`:: s` - omitts downloading of attached image\n');
		}
	}
	
	// ID COMMANDS
	{
		// SERVER ID
		if(message.content == `${prefix} server id`) {
			getServerID(message.guild, message.channel);
		}

		// CHANNEL ID	
		if(message.content == `${prefix} channel id`) {
			getChannelID(message.guild, message.channel);
		}
	}
	
	// INITIATE
	if(message.content == `${prefix} server init`) {
		createLibrary(message.guild, message.channel);
	}

	// COLLECT FROM CHANNEL
	if(message.content == `${prefix} channel collect`) {
		collectFromChannel(message.guild, message.channel);
	}

	// IMAGE LIBRARY MANAGEMENT
	{
		// RANDOM IMAGE FROM TAG
		if(message.content.startsWith(`${prefix} random image tag`)) {
			const args = message.content.slice(prefix.length).split(' ');
			if(args.length === 5) {
				randomImage(message.guild, message.channel, args[4]);
			}
			else {
				message.channel.send('This tag do not exist. Type `:: taglist` for list of all existing tags');
			}
		}
	}

	// DOWNLOAD
	if(
		message.content == `${prefix} s`|| message.content == `${prefix} skip`) {
		message.react('⏩');
		console.log(`image omitted`);
	}
	else if(message.attachments.first()) {
		imageSaver(
			message,
			message.attachments.first()
		);
	}
});

