

function getServerID(guild, channel) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	const imageList = require(`./../../servers/${guild.id}/images.json`)

	let numOfCollectedChannels = 0;
	let cl = channelList;
	let il = imageList;

	// gets info from channels.json
	for(let i=0; i < cl.length; i++) {
		if(cl[i].collect == true) {
			numOfCollectedChannels++;
		}
	}

	channel.send(
		`Server Name: **${guild.name}**\nServer ID: **${guild.id}**\nNumber of collected channels: **${numOfCollectedChannels}**\nNumber of images: **${il.length}**`,
	)
}
exports.getServerID = getServerID;