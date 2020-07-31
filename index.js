const { setTag } = require("./js/lib/setTag");

const { showImageTaglist } = require("./js/lib/showImageTaglist");

const { randomImage } = require("./js/lib/randomImage");

const { getServerID } = require(`./js/lib/getServerID`);

const { getChannelID } = require(`./js/lib/getChannelID`);

const { collectFromChannel } = require("./js/lib/collectFromChannel")

const { deleteImagesTag } = require("./js/lib/deleteImagesTag")

const { deleteImagesType } = require("./js/lib/deleteImagesType")

const { createLibrary } = require("./js/lib/createLibrary");

const { imageSaver } = require("./js/lib/imageSaver");

const { prefix, token } = require('./config.json');

const Discord = require(`discord.js`);

const client = new Discord.Client();

client.once('ready', () => {
	console.log("Ready")
	client.user.setActivity(':: help');
})

client.login(token);

client.on('message', message => {

	// HELP
	{
		if(message.content.startsWith(`${prefix} help`) || message.content.startsWith(`${prefix} h`)) {
		message.channel.send('`:: help`/`:: h` - list of commands\n`:: s` - omitts downloading attached image\n`:: server id` - basic server info\n`:: channel id` - basic channel info\n`:: server init` - creates server library\n`:: channel collect` - adds channel to list of channels that bot is getting images from\n`:: delete tag <xyz>` - deletes all images with tag <xyz>. Images from untagged channels are saved with tag `notag`\n`:: channel tag set <xyz>` - sets channel tag <xyz>');
		}

		if(message.content.startsWith(`${prefix} channel tag delete`)) {
			message.channel.send('This command do not exist. Maybe you meant `:: channel tag set <tagName>` or `:: delete images tag <tagName>`');
		}
	}
	
	
	// ID COMMANDS
	{
		// SERVER ID
		if(message.content.startsWith(`${prefix} server id`)) {
			getServerID(message.guild, message.channel);
		}

		// CHANNEL ID	
		if(message.content.startsWith(`${prefix} channel id`)) {
			getChannelID(message.guild, message.channel);
		}
	}
	
	// INITIATE
	if(message.content.startsWith(`${prefix} server init`)) {
		createLibrary(message.guild, message.channel);
	}

	// COLLECT FROM CHANNEL
	if(message.content.startsWith(`${prefix} channel collect`)) {
		collectFromChannel(message.guild, message.channel);
	}

	// TAG MANAGEMENT
	{
		// SHOW TAG LIST
		if(message.content.startsWith(`${prefix} taglist`)) {
			showImageTaglist(message.guild, message.channel)
		}

		// SET CHANNEL TAG	
		if(message.content.startsWith(`${prefix} channel tag set`)) {
			const args = message.content.slice(prefix.length).split(' ');
			
			if(args.length === 5) {
				setTag(message.guild, message.channel, args[4]);
			}
			else {
				message.channel.send('Tag name must be one word long');
			}
			
			console.log(`${message.channel.name} channel tag: ${args[4]}`);
		}

		
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

		// DELETE IMAGES
		{
			// DELETE IMAGES TYPE
			if(message.content.startsWith(`${prefix} delete images type`)) {
				const args = message.content.slice(prefix.length).split(' ');
				if(args.length === 5) {
					deleteImagesType(message.guild, message.channel, args[4]);
				}
				else {
					message.channel.send('Filetype must be one word long. Type `:: image typelist` for list of all filetypes in library');
				}
			}

			// DELETE IMAGES TAG
			if(message.content.startsWith(`${prefix} delete images tag`)) {
				const args = message.content.slice(prefix.length).split(' ');
				if(args.length === 5) {
					deleteImagesTag(message.guild, message.channel, args[4]);
				}
				else {
					message.channel.send('This tag do not exist. Type `:: image taglist` for list of all tags in library');
				}
			}
		}
	}

	
	// YANDEX
	{
		
	}

	// DOWNLOAD
	if(message.content.startsWith(`${prefix} s`) || message.content.startsWith(`${prefix} skip`)) {
		message.react('⏩');
		console.log(`image omitted`);
	}
	else if(message.attachments.first()) {
		imageSaver(
			message,
			message.attachments.first()
		);
	}
})

