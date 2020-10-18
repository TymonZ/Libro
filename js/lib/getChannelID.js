function getChannelID(guild, channel) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	const imageList = require(`./../../servers/${guild.id}/images.json`)
	
	let collects;
	let chanID;
	let numOfTaggedImages = 0;
	let cl = channelList;
	let il = imageList;

	// gets info from channels.json
	
	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == channel.id) {
			collects = cl[i].collect;
			chanID = cl[i].id;
		}
	}

	// gets info from images.json
	for(let i=0; i < il.length; i++) {
		if(il[i].chan == chanID) {
			numOfTaggedImages++;
		}
	}

	channel.send(
		`Channel Name: **${channel.name}**\nChannel ID: **${channel.id}**\nCollects from this channel:  **${collects}**\nNumber of images collected from this channel **${numOfTaggedImages}**\n`
	)
}
exports.getChannelID = getChannelID;